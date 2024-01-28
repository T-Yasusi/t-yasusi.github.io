# JavaScriptで数値計算デモページ
自作JavaScriptの数値計算ライブラリのためのデモページ  
Webページ上でサンプルコードを書き編集できる

## 機能
### シンタックスハイライト
[ace](https://ace.c9.io/)によるシンタックスハイライト <!-- BSD License -->

### 数学ライブラリ
メイン機能、`js/module/calc`以下のディレクトリにある
#### クラス
`js/module/calc/class/`以下に定義されている。
- Complex 複素数
- Vector ベクトル
- Matrix 行列
#### 逆行列 
- linearAlgebra.det $(\bf A)$ 行列式
- linearAlgebra.reverseBySweep $(\bf A)$ (ガウスジョルダンの消去法)掃き出し法による逆行列
#### LU分解
- linearAlgebra.LU.rightLooking $(\bf A)$ 
- linearAlgebra.LU.leftLooking $(\bf A)$

#### QR分解
- linearAlgebra.QR.gramSchmidt $(\bf A)$ グラムシュミット法
- linearAlgebra.QR.householder $(\bf A)$ ハウスホルダー法

#### 四則演算
ベクトル、行列、複素数などは対応済み
- add $(a, b)$ 足し算
- sub $(a, b)$ 引き算
- mul $(a, b)$ 掛け算
- div $(a, b)$ 割り算
#### 初等関数
複素数は対応済み
- sqrt $(x)$ 平方根
- pow $(x)$ べき乗
- factrial $(x)$ 階乗
- exp $(x)$ 指数関数
- sin $(x)$ 正弦関数
- cos $(x)$ 余弦関数
- tan $(x)$ 正接関数
- sinh $(x)$
- cosh $(x)$
- tanh $(x)$

#### 数値微分
- diff.forward $(f(x), x_0, \Delta x=1.0^{-8})$ 前方差分法
- diff.central $(f(x), x_0, \Delta x=1.0^{-8})$ 中心差分法
- diff.backward $(f(x), x_0, \Delta x=1.0^{-8})$ 後方差分法
#### 数値積分
- integral.trapezoid $(f(x), x_0, x_1, N)$ 台形法
- integral.simpson $(f(x), x_0, x_1, N)$ シンプソン法
#### 二重指数型積分 (Double Exponantial)
- integral.de.minusOneToOne $(f(x), \Delta x=1.0^{-8}) $-1$と$1$に特異点を持つ関数用
- integral.de.zeroToInf $(f(x), \Delta x=1.0^{-8})$ $0$から $\infty$までの積分
- integral.de.minusInfToInf $(f(x), \Delta x=1.0^{-8})$ $-\infty$から $\infty$までの積分

#### $f(x)=0$の数値解放
- solver.byselection $(f(x), x_0, \Delta x=1.0^{-8})$ 二分法
- solver.newton $(f(x), x_0, \Delta x=1.0^{-8})$ ニュートン法
#### 多項式の解放
- solver.polynomial.bastow $([a_0, \cdots, a_n], \Delta x=1.0^{-8})$ ベアストウ法
- solver.polynomial.dka $([a_0, \cdots, a_n], \Delta x=1.0^{-8})$ DKA法

#### 演算子オーバーロード
`+,-,*,/`の演算子はBabelのpluginを使って以下のように変換されることにより擬似的にオーバーロードされている。
```js:befor
a+b;
```
```js:after
add(a, b);
```
のように変換される。そのため、前述のベクトルや行列、複素数クラスにも適応される。
