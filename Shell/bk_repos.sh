#!/bin/sh

## エラーが出たらその場でスクリプトを停止する
set -eu

## 環境設定
## ====================================================================================
# AWSAccessKeyの設定　※Git管理する為、認証情報はサーバ上に保管
# 実行時に "source /root/bin/aws_secrets.sh; bk_repos.sh" で環境変数を読み込む
# export AWS_ACCESS_KEY_ID=hoge
# export AWS_SECRET_ACCESS_KEY=fuga
# export AWS_DEFAULT_REGION=ap-northeast-1
# export AWS_DEFAULT_OUTPUT=json
# codecommitを使用する際のおまじない
git config --global credential.helper '!aws codecommit credential-helper $@'
git config --global credential.UseHttpPath true
# バックアップ用S3バケットの設定
S3Bucket=gazelle-ope-codecommit-bk
# 作業ディレクトリの設定
WorkDir=~/work_$(date "+%Y%m%d-%H%M%S")
# ログディレクトリパスの設定 "Command 1>> ${std_log} 2>> ${err_log}"
std_log=/var/log/bk_codecommit_repos/bk_repos_$(date +%F).log
err_log=/var/log/bk_codecommit_repos/bk_repos_error_$(date +%F).log
## ====================================================================================


# 作業ディレクトリの作成
mkdir ${WorkDir} ; cd ${WorkDir} 1>> ${std_log} 2>> ${err_log}

# Gitレポジトリ一覧の取得
ReposName_List=($(aws codecommit list-repositories --query repositories[].repositoryName --output text)) 1>> ${std_log} 2>> ${err_log}

for ReposName in ${ReposName_List[@]}
do
    git clone "https://git-codecommit.${AWS_DEFAULT_REGION}.amazonaws.com/v1/repos/${ReposName}"  1>> ${std_log} 2>> ${err_log}

    # ディレクトリ移動
    cd ${WorkDir}/${ReposName}

    # 全てのリモートbranchをローカルリポジトリにコピーする
    # 既に存在するブランチ"master"や、存在しないブランチ"HEAD, ->"は既知のエラーとして虚無に葬る
    set +e
    for RemoteBranch in `git branch -r`
    do
        git branch --track ${RemoteBranch#origin/} ${RemoteBranch} 1>> ${std_log} 2>/dev/null
    done
    set -e

    # ディレクトリ移動
    cd ${WorkDir}

    # 圧縮ファイル名
    SAVE_FILE=${ReposName}_$(date +%F).tar.gz
    # 圧縮ファイルの保存先ディレクトリパス
    SAVE_DIR=${WorkDir}
    # 圧縮ファイルに変換
    tar zcf ${SAVE_FILE} -C ${SAVE_DIR} ${ReposName} 1>> ${std_log} 2>> ${err_log}

    # アップロード
    aws s3 cp ${SAVE_FILE} s3://${S3Bucket}/${ReposName}/ 1>> ${std_log} 2>> ${err_log}
done

# 作業ディレクトリの削除
cd ~ ; rm -rf ${WorkDir}
