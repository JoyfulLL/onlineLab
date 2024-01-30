#!/bin/sh

# 请在 unix 终端或 git-bash 中运行此脚本

printf "\n1. 项目成员数量："
git log --pretty='%aN' | sort -u | wc -l

printf "\n\n2. 按用户名统计代码提交次数：\n\n"
printf "%10s  %s\n" "次数" "用户名"
git log --pretty='%aN' | sort | uniq -c | sort -k1 -n -r | head -n 5
printf "\n%10s\n" "合计"
git log --oneline | wc -l

printf "\n3. 按用户名统计代码提交行数：\n\n"
printf "%-25s %10s %10s %10s\n" "用户名" "总行数" "添加行数" "删除行数"
git log --format='%aN' | sort -u -r | while read -r name; do
  printf "%-25s" "$name"
  git log --author="$name" --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%10s %10s %10s\n", loc, add, subs }'
done

printf "\n%25s   " "总计："
git log --pretty=tformat: --numstat | awk '{ add += $1; subs += $2; loc += $1 - $2 } END { printf "%10s %10s %10s\n", loc, add, subs }'

echo ""
read -n 1 -p "请按任意键继续..."