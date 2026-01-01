@echo off
echo ========================================
echo  Starting Jekyll Development Server
echo ========================================
echo.
echo Server: http://127.0.0.1:4000
echo.
echo Press Ctrl+C to stop
echo ========================================
echo.

bundle exec jekyll serve --incremental --host 0.0.0.0 --port 4000 --livereloadport 35729
