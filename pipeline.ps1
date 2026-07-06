Write-Host "====== 1. Building Playwright image ======" -ForegroundColor Cyan
docker build -t playwright-local:latest .

if (Get-Command minikube -ErrorAction SilentlyContinue) {
    minikube image load playwright-local:latest

    Write-Host "Waiting for Minikube to recognize the image..." -ForegroundColor Yellow
    $maxAttempts = 12
    $attempt = 0
    while ($attempt -lt $maxAttempts) {
        $imageList = minikube image ls
        if ($imageList -match 'playwright-local:latest') {
            break
        }
        $attempt++
        Start-Sleep -Seconds 5
    }
}

Write-Host "====== 2. Cleaning up old cluster jobs ======" -ForegroundColor Cyan
kubectl delete jobs --all

Write-Host "====== 3. Launching 3 parallel Playwright shards ======" -ForegroundColor Cyan
.\run-shards.ps1

Write-Host "====== 4. Executing tests inside Kubernetes ======" -ForegroundColor Yellow
# Loop until all shard pods have stopped running/pending
while ($true) {
    $podStatuses = kubectl get pods -l "app in (playwright-shard-1, playwright-shard-2, playwright-shard-3)" -o jsonpath='{.items[*].status.phase}' 2>$null
    
    if ($podStatuses -like "*Running*" -or $podStatuses -like "*Pending*") {
        Write-Host "." -NoNewline -ForegroundColor Yellow
        Start-Sleep -Seconds 5
    } else {
        Write-Host "`nAll pods have finished executing!" -ForegroundColor Green
        break
    }
}

# ⬇️ NEW DIAGNOSTIC STEP INJECTED HERE ⬇️
Write-Host "====== 3b. Fetching Pod Logs for Diagnostics ======" -ForegroundColor Magenta
# Get all pods whose names start with playwright-shard
$shardPods = (kubectl get pods -o jsonpath='{.items[*].metadata.name}') -split ' ' | Where-Object { $_ -like "playwright-shard*" }

if ($shardPods) {
    foreach ($pod in $shardPods) {
        if ($pod.Trim()) {
            Write-Host "`n--- LOGS FOR POD: $pod ---" -ForegroundColor Cyan
            kubectl logs $pod
            Write-Host "----------------------------------" -ForegroundColor Cyan
        }
    }
} else {
    Write-Host "No playwright-shard pods found in the cluster." -ForegroundColor Red
}
# ⬆️ ─────────────────────────────────────────────── ⬆️

Write-Host "====== 4. Automatically Extracting and Opening Allure Report ======" -ForegroundColor Green
# This triggers your extraction script, which ends by popping open your browser!
.\extract-reports.ps1