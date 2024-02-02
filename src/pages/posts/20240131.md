---
layout: ../../layouts/MarkdownPostLayout.astro
title: "pod installで EACCES - Permission denied でインストールできない場合の対処方法"
pubDate: 2024-01-31
author: "D4ken"
description: "pod instal で管理者権限関連のエラーが発生した時の対処法について解説します。"
thumbnail:
  "https://images.unsplash.com/photo-1493236296276-d17357e28888?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
tags: ["Unity"]
---

iOSビルドに広告関連のSDKが入っている場合podを導入する必要があるのですが、podをアップデートした際にpermissionが変更されてしまったのか、下記のようなエラーが発生していました。
```bash
Errno:: EACCES - Permission denied @ rb_sysopen - /Users/d4ken/Library/Caches/CocoaPods/Pods/VERSION
~~~ 以下略 ~~~
```
こちらのエラー発生原因として~/Library/Caches/CococaPodsの権限がrootになっていることが考えられます。

こちらの権限を変更するには下記のコマンドを入力します。
```bash
$ sudo chown -R `whoami` ~/Library/Caches/CocoaPods
```
再度pod installしてみます。
```bash
$ pod install
Analyzing dependencies
Downloading dependencies
Installing Ads-Global (5.6.0.9)
Installing BURelyFoundation_Global (0.1.3.3)
Installing FBAEMKit (13.2.0)
Installing FBAudienceNetwork (6.14.0)
~~~ 以下略 ~~~
```


エラーの表示はなくなり、無事.xcworkspaceが生成されました。  
<br>
___
<br>

参考リンク:
>[Error running pod install for an update due to permissions](https://stackoverflow.com/questions/19956425/error-running-pod-install-for-an-update-due-to-permissions)