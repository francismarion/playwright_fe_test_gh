# Loop to dynamically generate and apply your 3 shards
1..3 | ForEach-Object {
    $SHARD_NUMBER = $_
    $TOTAL_SHARDS = 3

    # 💡 CHANGED: Points directly to your real k8s file name
    (Get-Content .\k8s-playwright-job.yaml) `
      -replace '\$\{SHARD_NUMBER\}', $SHARD_NUMBER `
      -replace '\$\{TOTAL_SHARDS\}', $TOTAL_SHARDS `
      | kubectl apply -f -
}