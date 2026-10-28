# Usage (PowerShell, project folder me):
#   .\scripts\neon-to-aiven.ps1 -AivenUrl "postgres://avnadmin:PASS@host:PORT/defaultdb?sslmode=require"
# Neon URL apne aap .env.local ke DATABASE_URL se uthayega (ya -NeonUrl se do).
param(
  [Parameter(Mandatory=$true)][string]$AivenUrl,
  [string]$NeonUrl = ""
)
$ErrorActionPreference = "Stop"

if (-not $NeonUrl) {
  $envFile = Join-Path (Split-Path $PSScriptRoot -Parent) ".env.local"
  $line = Select-String -Path $envFile -Pattern '^\s*DATABASE_URL\s*=' | Select-Object -First 1
  if (-not $line) { throw "DATABASE_URL .env.local me nahi mila. -NeonUrl do." }
  $NeonUrl = ($line.Line -split '=', 2)[1].Trim().Trim('"').Trim("'")
}

# pg_dump / pg_restore dhoondo
function Find-Tool($name) {
  $c = Get-Command $name -ErrorAction SilentlyContinue
  if ($c) { return $c.Source }
  $hit = Get-ChildItem "C:\Program Files\PostgreSQL" -Recurse -Filter "$name.exe" -ErrorAction SilentlyContinue |
         Sort-Object FullName -Descending | Select-Object -First 1
  if ($hit) { return $hit.FullName }
  throw "$name nahi mila. PostgreSQL Command Line Tools install karo (postgresql.org)."
}
$pgDump = Find-Tool "pg_dump"; $pgRestore = Find-Tool "pg_restore"; $psql = Find-Tool "psql"
Write-Host "Using: $pgDump"

$dump = Join-Path $env:TEMP "toolspy.dump"
Write-Host "1/3 Neon se dump ho raha hai..."
& $pgDump $NeonUrl --no-owner --no-acl --format=custom -f $dump
if ($LASTEXITCODE -ne 0) { throw "pg_dump fail (Neon quota block ho sakta hai)." }
Write-Host ("Dump size: {0:N1} MB" -f ((Get-Item $dump).Length/1MB))

Write-Host "2/3 Aiven me restore ho raha hai..."
& $pgRestore --no-owner --no-acl --clean --if-exists -d $AivenUrl $dump
Write-Host "(pg_restore exit code: $LASTEXITCODE -- 'already exists'/extension warnings chalte hain)"

Write-Host "3/3 Aiven tables check:"
& $psql $AivenUrl -c "\dt"
Write-Host "Done. Ab Aiven URI me ?sslmode=no-verify lagakar .env.local aur Amplify env vars me DATABASE_URL badlo."
