# =====================================================================
# 1. CLEAN UP LOCAL DIRECTORIES FIRST
# =====================================================================
Write-Host "Cleaning up old local data..." -ForegroundColor Cyan
if (Test-Path ".\merged-allure-results") {
    Remove-Item -Recurse -Force ".\merged-allure-results"
}
New-Item -ItemType Directory -Force -Path ".\merged-allure-results"

# =====================================================================
# 2. SPIN UP THE HELPER POD
# =====================================================================
Write-Host "Spinning up temporary reporter-pod..." -ForegroundColor Cyan

# Clean up any leftover pod from a crashed previous run
kubectl delete pod reporter-pod --grace-period=0 --force 2>$null

kubectl delete pod reporter-pod --grace-period=0 --force 2>$null
@"
apiVersion: v1
kind: Pod
metadata:
  name: reporter-pod
spec:
  restartPolicy: Never
  containers:
  - name: main
    image: alpine:latest
    command: ["sleep", "3600"]
    volumeMounts:
    - name: vol
      mountPath: /data
  volumes:
  - name: vol
    persistentVolumeClaim:
      claimName: allure-shared-pvc
"@ | kubectl apply -f -
kubectl wait --for=condition=Ready pod/reporter-pod --timeout=60s

# Wait for the helper pod to turn on
Write-Host "Waiting for helper pod to spin up..." -ForegroundColor Yellow
kubectl wait --for=condition=Ready pod/reporter-pod --timeout=30s

# =====================================================================
# 3. COPY AND FLATTEN FILES
# =====================================================================
Write-Host "Copying results from Kubernetes cluster to local machine..." -ForegroundColor Cyan
kubectl cp reporter-pod:/data ./merged-allure-results

# CRITICAL: Pull files out of sub-shards into the root before Allure reads them!
Write-Host "Consolidating distributed shard results..." -ForegroundColor Yellow
Get-ChildItem -Path .\merged-allure-results -Recurse -File | Move-Item -Destination .\merged-allure-results -Force

# =====================================================================
# 4. TEARDOWN CLUSTER HELPER
# =====================================================================
Write-Host "Cleaning up helper pod..." -ForegroundColor Cyan
kubectl delete pod reporter-pod --wait=$false

# =====================================================================
# 5. GENERATE AND OPEN REPORT
# =====================================================================
Write-Host "Generating combined Allure HTML report..." -ForegroundColor Green
npx allure generate ./merged-allure-results --clean -o allure-report

Write-Host "Opening Allure Report in browser..." -ForegroundColor Green
npx allure open allure-report