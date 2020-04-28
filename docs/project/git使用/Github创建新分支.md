# git常用命令

```
git branch 
查看分支


git branch xx 
创建分支xx


git checkout xx 
切换到xx分支
git ckecout -b xx  
创建并切换到指定分支


git branch -d xx 
删除一个干净的分支(即相对当前分支而言该分支没有新的提交记录)


git branch -D xx 
强制删除一个分支，该分支有没有合并到当前分支的提交记录
```

**删除分支前都需要先切换到其他分支才能进行删除操作**

```
git branch -m xx  aa  
把xx分支改名aa
```

```
git merge xx 
将指定分支合并到当前分支
```

## git提交分支

```
git add.
git commit -m 'change'
git push  //把本地xx分支的内容提交到线上xx
```

## git合并

```
git chekout master
git merge origin/xx  把线上这个分支合并到master分支
```

