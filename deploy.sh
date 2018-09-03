set -e
npm run docs:build
cd docs/.vuepress/dist
echo echo 'www.shinglove.com' > CNAME
git init
git add -addgit commit -m 'deploy'
cd -
