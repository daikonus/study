#!/bin/sh -eu

# 一括ダウンロード
aws s3 cp s3://XXXX/ ./tmp/ --exclude "*" --include "*2019-12-05*" --recursive

# CloudFrontの場合(APサーバ側)
aws s3 ls s3://XXXX | grep 2019-12-05 | awk '{print $4}' > filenamelist
# CloudFrontの場合(バックエンド静的コンテンツバケット)
aws s3 ls s3://XXXX-stat | grep 2019-11-18-00 | awk '{print $4}' > filenamelist
# ALBの場合
aws s3 ls s3://XXXX/AWSLogs/098435297579/elasticloadbalancing/ap-northeast-1/2019/11/18/ | awk '{print $4}' > filenamelist
# istio-proxyポッドの場合
aws s3 ls s3://XXXX/2019-11-18/fighters/istio-proxy/ | awk '{print $4}' > filenamelist
# backポッド(通常)の場合
aws s3 ls s3://XXXX/2019-11-18/fighters/back/ | awk '{print $4}' | grep -v GC > filenamelist
# backポッド(GCログ)の場合
aws s3 ls s3://XXXX/2019-11-18/fighters/back/ | awk '{print $4}' | grep GC > filenamelist


# BucketName="XXXX/AWSLogs/098435297579/elasticloadbalancing/ap-northeast-1/2019/11/18"
BucketName="XXXX"

for zipfile in `cat filenamelist`;do
  # ログファイル取得
  aws s3 cp s3://${BucketName}/${zipfile} ./
  # 圧縮ファイル解凍
  gzip -d ${zipfile}
  # ログファイルを吐き出す
  {
    echo "====================================================================================================="
    echo "SourceFileName: ${zipfile}"
    echo "====================================================================================================="
    cat ${zipfile%.gz}
    echo -e "\n\n"
  }  >> test_combine.log
  # 元ファイルの削除
  rm ${zipfile%.gz}
done
