# Lesson 21: Reports

## 1. Allure
! java must be installed!
1. npm i -D allure-commandline allure-playwright
2. npm run test
3. npm run allure:generate && npm run allure:open

## 2. ReportPortal (works for m1 mac)
! Docker must be installed!
1. mkdir ~/reportportal && cd ~/reportportal
2. curl -O https://raw.githubusercontent.com/reportportal/reportportal/master/docker-compose.yml
3. docker-compose -p reportportal up -d --force-recreate
4. Go to localhost:8080
5. Setup ReportPortal
6. npm run test
7. Go to report 'http://localhost:8080/ui/#default_personal/launches/all/67952943-cb97-4229-ae6f-259ee64fcfb7'

