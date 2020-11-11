(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{433:function(t,s,a){t.exports=a.p+"assets/img/path-1604287948781.65efe218.png"},434:function(t,s,a){t.exports=a.p+"assets/img/gitflow-1604287948781.2ff72e62.png"},827:function(t,s,a){"use strict";a.r(s);var n=a(43),e=Object(n.a)({},(function(){var t=this,s=t.$createElement,n=t._self._c||s;return n("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[n("h1",{attrs:{id:"git常用指令"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#git常用指令"}},[t._v("#")]),t._v(" git常用指令")]),t._v(" "),n("h2",{attrs:{id:"配置用户名邮箱"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#配置用户名邮箱"}},[t._v("#")]),t._v(" 配置用户名邮箱")]),t._v(" "),n("p",[t._v("当安装完 Git 应该做的第一件事就是设置你的用户名称与邮件地址。 这样做很重要，因为每一个 Git 的提交都会使用这些信息，并且它会写入到你的每一次提交中，不可更改。")]),t._v(" "),n("p",[n("strong",[t._v("1.指定项目配置用户")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config user.name "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"你的姓名"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config user.email "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"你的邮箱"')]),t._v("\n")])])]),n("p",[n("strong",[t._v("2.-- global全局配置")])]),t._v(" "),n("p",[t._v("通过 "),n("code",[t._v("--global")]),t._v(" 选项可以设置全局配置信息")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.name "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"你的姓名"')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.email "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"你的邮箱"')]),t._v("\n")])])]),n("p",[n("strong",[t._v("3.检查配置")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 打印所有config")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --list\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 打印指定config")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config user.name\n")])])]),n("h2",{attrs:{id:"创建仓库-repository"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建仓库-repository"}},[t._v("#")]),t._v(" 创建仓库 - repository")]),t._v(" "),n("p",[t._v("进入希望纳入 git 版本控制的项目目录，使用 "),n("code",[t._v("git init")]),t._v(" 初始化")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n")])])]),n("p",[t._v("该命令将创建一个名为 "),n("code",[t._v(".git")]),t._v(" 的子目录，这个子目录含有你初始化的 Git 仓库中所有的必须文件，这个目录也是上面我们说的三个区域之一，这个目录也是 Git 保存数据记录的地方，非常重要，如非必要，不要轻易改动")]),t._v(" "),n("p",[t._v("查看git文件")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v(" -a\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ls")]),t._v(" -al //以列表形式列出当前文件夹下的目录\n")])])]),n("h2",{attrs:{id:"工作区"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#工作区"}},[t._v("#")]),t._v(" 工作区")]),t._v(" "),n("ul",[n("li",[t._v("工作目录")]),t._v(" "),n("li",[t._v("暂存区域")])]),t._v(" "),n("h2",{attrs:{id:"查看工作区的文件状态"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看工作区的文件状态"}},[t._v("#")]),t._v(" 查看工作区的文件状态")]),t._v(" "),n("p",[t._v("文件状态有四种:")]),t._v(" "),n("ol",[n("li",[n("code",[t._v("未追踪（Untracked）")]),t._v(" :当一个项目被 Git 初始化init以后，只是表示我们希望通过 Git 来管理当前的这个项目文件的不同时期版本记录，但是这个时候项目中已存在的文件，或者以后新增的文件都是没有进入版本控制管理的，它们是的状态。")]),t._v(" "),n("li",[t._v("已修改(modified)")]),t._v(" "),n("li",[t._v("已暂存(staged)")]),t._v(" "),n("li",[t._v("已提交(commited)")])]),t._v(" "),n("p",[t._v("使用"),n("code",[t._v("git status")]),t._v("查看工作区中的文件状态")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" status\n")])])]),n("h3",{attrs:{id:"乱码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#乱码"}},[t._v("#")]),t._v(" 乱码")]),t._v(" "),n("h4",{attrs:{id:"git-status-显示乱码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#git-status-显示乱码"}},[t._v("#")]),t._v(" git status 显示乱码")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global core.quotepath "),n("span",{pre:!0,attrs:{class:"token boolean"}},[t._v("false")]),t._v("\n")])])]),n("h4",{attrs:{id:"终端乱码"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#终端乱码"}},[t._v("#")]),t._v(" 终端乱码")]),t._v(" "),n("p",[t._v("菜单 -> 设置 -> 文本 -> 本地 / 编码")]),t._v(" "),n("p",[t._v("或修改配置文件")]),t._v(" "),n("div",{staticClass:"language- extra-class"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[t._v("[gui]  \n    encoding = utf-8  \n    # 代码库统一使用utf-8  \n[i18n]  \n    commitencoding = utf-8  \n    # log编码\n[svn]  \n    pathnameencoding = utf-8  \n    # 支持中文路径\n[core]\n    quotepath = false \n    # status引用路径不再是八进制（反过来说就是允许显示中文了）\n")])])]),n("h2",{attrs:{id:"添加工作区文件到暂存区"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#添加工作区文件到暂存区"}},[t._v("#")]),t._v(" 添加工作区文件到暂存区")]),t._v(" "),n("p",[n("code",[t._v("git add")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(".txt\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加多个文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("2")]),t._v(".txt "),n("span",{pre:!0,attrs:{class:"token number"}},[t._v("3")]),t._v(".txt\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加整个目录")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" ./a\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加多个目录")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" ./b ./c\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加所有文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),n("h3",{attrs:{id:"创建版本"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建版本"}},[t._v("#")]),t._v(" 创建版本")]),t._v(" "),n("p",[n("code",[t._v("git commit")])]),t._v(" "),n("p",[t._v("将暂存区里的改动给提交到本地 git 仓库，也就是为这次工作（一般会把某个具有特定意义的工作作为一个版本，它可以是多个文件的变化）")]),t._v(" "),n("ul",[n("li",[t._v("每次提交同时会生成一个 40 位的哈希值，作为该次提交版本的唯一 id")])]),t._v(" "),n("h4",{attrs:{id:"提交备注"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#提交备注"}},[t._v("#")]),t._v(" 提交备注")]),t._v(" "),n("p",[t._v("每次提交都需要填写备注信息")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 会调用默认（或自定义）的文本编辑器")]),t._v("\n")])])]),n("h4",{attrs:{id:"修改默认编辑器"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#修改默认编辑器"}},[t._v("#")]),t._v(" 修改默认编辑器")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config core.editor notepad\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加 vscode 编辑器 - mac")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 通过 vim 打开环境变量配置文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("vim")]),t._v(" ~/.bash_profile\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 添加环境变量")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("export")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token assign-left variable"}},[n("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("PATH")])]),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("/Applications/Visual"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Studio"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("\\")]),t._v(" Code.app/Contents/Resources/app/bin:"),n("span",{pre:!0,attrs:{class:"token environment constant"}},[t._v("$PATH")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 保存退出")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("source")]),t._v(" ~/.bash_profile\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 测试：在终端中直接通过命令 code 调用 vscode")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global core.editor "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"code --wait"')]),t._v("\n")])])]),n("h4",{attrs:{id:"单行备注"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#单行备注"}},[t._v("#")]),t._v(" 单行备注")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m 备注信息\n")])])]),n("h2",{attrs:{id:"查看提交日志"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看提交日志"}},[t._v("#")]),t._v(" 查看提交日志")]),t._v(" "),n("p",[n("code",[t._v("git log")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("// 完整格式\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log\n// 简要格式（单行）\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" log --oneline\n")])])]),n("h2",{attrs:{id:"修复提交"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#修复提交"}},[t._v("#")]),t._v(" 修复提交")]),t._v(" "),n("p",[n("code",[t._v("git commit --amend")])]),t._v(" "),n("p",[t._v("修复（替换上一次）提交，在不增加一个新的提交版本的情况下将新修改的代码追加到前一次的提交中")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit --amend -m 提交\n")])])]),n("h2",{attrs:{id:"删除"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#删除"}},[t._v("#")]),t._v(" 删除")]),t._v(" "),n("p",[n("code",[t._v("git rm")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 从 git 仓库与工作区中删除指定文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" 文件\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 只删除 git 仓库中的文件")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" --cached 文件\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# rm 以后，需要 commit 这次操作，否则 rm 将保留在暂存区")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m 修正\n")])])]),n("h3",{attrs:{id:"撤销重置"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#撤销重置"}},[t._v("#")]),t._v(" 撤销重置")]),t._v(" "),n("p",[n("code",[t._v("git reset")])]),t._v(" "),n("h4",{attrs:{id:"从暂存区中撤销到工作区"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#从暂存区中撤销到工作区"}},[t._v("#")]),t._v(" 从暂存区中撤销到工作区")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("// 从暂存区中撤销一个指定文件\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset HEAD 文件名称\n// 从暂存区中国年撤销所有文件\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset HEAD "),n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),n("h4",{attrs:{id:"该命令既可以用于回退版本"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#该命令既可以用于回退版本"}},[t._v("#")]),t._v(" 该命令既可以用于回退版本")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 回退到指定的 commitID 版本")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" reset --hard commitID\n")])])]),n("h2",{attrs:{id:"比较"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#比较"}},[t._v("#")]),t._v(" 比较")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 比较 工作区和暂存区")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" 文件 \n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 比较 暂存区和仓库")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" --cached "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("commitId"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" 文件\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 比较 工作区和仓库")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" commitId filename\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 比较 仓库不同版本")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("diff")]),t._v(" commitId1 commitId2\n")])])]),n("h2",{attrs:{id:"分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#分支"}},[t._v("#")]),t._v(" 分支")]),t._v(" "),n("p",[t._v("我们的开发就像是游戏的任务，默认是在主线（master）上进行开发的。许多时候，还有各种支线任务，git 支持我们创建分支来进行项目开发")]),t._v(" "),n("h3",{attrs:{id:"查看分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看分支"}},[t._v("#")]),t._v(" 查看分支")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch\n")])])]),n("h3",{attrs:{id:"创建分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#创建分支"}},[t._v("#")]),t._v(" 创建分支")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch 分支名称\n")])])]),n("h3",{attrs:{id:"切换分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#切换分支"}},[t._v("#")]),t._v(" 切换分支")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout 分支名称\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 也可以使用 checkout -b 来新建分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b 分支名称\n")])])]),n("h3",{attrs:{id:"分支合并"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#分支合并"}},[t._v("#")]),t._v(" 分支合并")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# B 合并到 A，需要切换到 A 分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge 被合并分支\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看已经合并的分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch --merged\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看未合并的分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch --no-merged\n")])])]),n("h3",{attrs:{id:"删除分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#删除分支"}},[t._v("#")]),t._v(" 删除分支")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果分支为未合并状态，则不允许删除")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d 分支名称\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 强制删除")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -D 分支名称\n")])])]),n("h2",{attrs:{id:"合并记录"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#合并记录"}},[t._v("#")]),t._v(" 合并记录")]),t._v(" "),n("p",[n("code",[t._v("rebase")])]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 合并 HEAD 前两个祖先记录")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" rebase -i HEAD~2\n")])])]),n("h3",{attrs:{id:"与"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#与"}},[t._v("#")]),t._v(" ~ 与 ^")]),t._v(" "),n("p",[t._v("~ : 纵向")]),t._v(" "),n("p",[t._v("^ : 横向")]),t._v(" "),n("p",[n("img",{attrs:{src:a(433),alt:"1566209448773"}})]),t._v(" "),n("h4",{attrs:{id:"rebase-操作"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#rebase-操作"}},[t._v("#")]),t._v(" rebase 操作")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# p, pick = use commit => 使用")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# r, reword = use commit, but edit the commit message => 使用，但重新编辑说明")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# e, edit = use commit, but stop for amending => 使用")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# s, squash = use commit, but meld into previous commit => 使用，但合并上一次")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v('# f, fixup = like "squash", but discard this commit\'s log message => 就像 squash 那样，但会抛弃这个 Commit 的 Commit message')]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# x, exec = run command (the rest of the line) using shell => 执行脚本")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# d, drop = remove commit => 移除")]),t._v("\n")])])]),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" rebase -i HEAD~3\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 弹出编辑器，根据需要的进行修改，然后保存")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 如果为 r，s 则会再次弹出编辑器，修改新的 commit message，修改之后保存")]),t._v("\n")])])]),n("blockquote",[n("p",[t._v("如果出现一些问题，可以通过 "),n("code",[t._v("git rebase --edit-todo")]),t._v(" 和 "),n("code",[t._v("git rebase --continue")]),t._v(" 进行重新编辑保存")])]),t._v(" "),n("h2",{attrs:{id:"合并冲突"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#合并冲突"}},[t._v("#")]),t._v(" 合并冲突")]),t._v(" "),n("p",[t._v("有的时候，不同的分支可能会对同一个文件内容和位置上进行操作，这样在合并的过程中就会产生冲突")]),t._v(" "),n("ul",[n("li",[t._v("查看冲突文件")]),t._v(" "),n("li",[t._v("修复冲突内容")]),t._v(" "),n("li",[t._v("提交")])]),t._v(" "),n("h2",{attrs:{id:"标签"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#标签"}},[t._v("#")]),t._v(" 标签")]),t._v(" "),n("p",[t._v("有的时候，我们希望给某一个特定的历史提交打上一些标签")]),t._v(" "),n("h3",{attrs:{id:"新建-tag"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#新建-tag"}},[t._v("#")]),t._v(" 新建 tag")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" tag -a v1.0.0 HEAD/commitId\n")])])]),n("h3",{attrs:{id:"查看-tag"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#查看-tag"}},[t._v("#")]),t._v(" 查看 tag")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" tag\n")])])]),n("h2",{attrs:{id:"github"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#github"}},[t._v("#")]),t._v(" github")]),t._v(" "),n("p",[t._v("以上所有的操作都是建立在本地的，如果我们希望进行团队协同开发，那么这个时候，我们就需要把 git 仓库信息与团队中的所有人进行共享")]),t._v(" "),n("ul",[n("li",[t._v("分布式 - 中心化与去中心化")])]),t._v(" "),n("p",[t._v("首先注册一个账号")]),t._v(" "),n("p",[t._v("使用 ssh 链接")]),t._v(" "),n("h2",{attrs:{id:"ssh"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#ssh"}},[t._v("#")]),t._v(" SSH")]),t._v(" "),n("p",[t._v("https://help.github.com/cn/articles/connecting-to-github-with-ssh")]),t._v(" "),n("p",[t._v("https://help.github.com/cn/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent")]),t._v(" "),n("h3",{attrs:{id:"生成-ssh-秘钥"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#生成-ssh-秘钥"}},[t._v("#")]),t._v(" 生成 SSH 秘钥")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ssh-keygen -t rsa -C "),n("span",{pre:!0,attrs:{class:"token string"}},[t._v('"zmouse@miaov.com"')]),t._v("\n")])])]),n("h3",{attrs:{id:"添加代理"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#添加代理"}},[t._v("#")]),t._v(" 添加代理")]),t._v(" "),n("p",[t._v("使用 "),n("code",[t._v("ssh-add")]),t._v(" 代理，如果没有启动，可以手动启动")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("eval")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token variable"}},[n("span",{pre:!0,attrs:{class:"token variable"}},[t._v("$(")]),t._v("ssh-agent -s"),n("span",{pre:!0,attrs:{class:"token variable"}},[t._v(")")])]),t._v("\n")])])]),n("h3",{attrs:{id:"添加-私钥"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#添加-私钥"}},[t._v("#")]),t._v(" 添加 私钥")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[t._v("ssh-add 私钥路径\n")])])]),n("h3",{attrs:{id:"在-github-上添加公钥"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#在-github-上添加公钥"}},[t._v("#")]),t._v(" 在 github 上添加公钥")]),t._v(" "),n("p",[t._v("个人中心 -> 设置 -> ssh -> 添加")]),t._v(" "),n("h3",{attrs:{id:"测试"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#测试"}},[t._v("#")]),t._v(" 测试")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("ssh")]),t._v(" -T git@github.com\n")])])]),n("h2",{attrs:{id:"git-远程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#git-远程"}},[t._v("#")]),t._v(" git 远程")]),t._v(" "),n("h3",{attrs:{id:"链接"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#链接"}},[t._v("#")]),t._v(" 链接")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin git@github.com:miaov-zmouse/kkb-test.git\n")])])]),n("h3",{attrs:{id:"提交（同步）远程"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#提交（同步）远程"}},[t._v("#")]),t._v(" 提交（同步）远程")]),t._v(" "),n("p",[t._v("同步本地仓库到远程")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin master\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# -u 简化后续操作")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin master\n")])])]),n("h3",{attrs:{id:"远程分支"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#远程分支"}},[t._v("#")]),t._v(" 远程分支")]),t._v(" "),n("div",{staticClass:"language-bash extra-class"},[n("pre",{pre:!0,attrs:{class:"language-bash"}},[n("code",[n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 提交到远程（分支）")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("本地分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(":"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("远程分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 远程先创建好分支然后拉取到本地")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("本地分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" origin/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("远程分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 拉取远程分支到本地")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull origin "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("远程分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(":"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("本地分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看远程仓库")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote show origin\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看本地分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看远程分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -r\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 查看所有分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -a\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除本地分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("本地分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 删除远程分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin --delete "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("远程分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# or")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push origin :"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("远程分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n\n"),n("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 设置默认提交分支")]),t._v("\n"),n("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch --set-upstream-to"),n("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v("origin/"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("远程分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v(" "),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("[")]),t._v("本地分支名称"),n("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("]")]),t._v("\n")])])]),n("h2",{attrs:{id:"扩展：工作流-git-work-flow"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#扩展：工作流-git-work-flow"}},[t._v("#")]),t._v(" 扩展：工作流 - git work flow")]),t._v(" "),n("p",[n("img",{attrs:{src:a(434),alt:"img"}})]),t._v(" "),n("h2",{attrs:{id:"gui-工具"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#gui-工具"}},[t._v("#")]),t._v(" GUI 工具")]),t._v(" "),n("p",[t._v("https://git-scm.com/download/gui/win")]),t._v(" "),n("ul",[n("li",[t._v("Sourcetree")]),t._v(" "),n("li",[t._v("other editor")])])])}),[],!1,null,null,null);s.default=e.exports}}]);