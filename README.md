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
ベクトル・行列(Vector、Matrix)クラスに割り算は定義していない、
逆数の掛け算で対応して欲しい。
行列式、逆行列etcなどのメソッドは正方行列とは限らないので行列クラスのメソッドにはしない。
(行列クラスを継承させた正方行列クラスも要素数で縛れないので外に定義する)
- Complex 複素数
```ts:Complex.js
Complex{
   constructor(real :number, imag :number);
   
   re() : number // 実部の別名
   im() : number // 虚部の別名
   abs2() : number // 絶対値の二乗
   abs() : number // 絶対値
   arg() : number // 偏角
   minus() : Complex // -z
   reverse(): Complex // 逆数
   conj() : Complex // 複素共役

   add(a : number | Complex) : Complex // 足し算
   sub(a : number | Complex) : Complex // 引き算
   mul(a : number | Complex) : Complex // 掛け算
   div(a : number | Complex) : Complex // 割り算

   toString() : string 
   toTex() : string // MathJax用
   toEffNum(n : number) : string // 浮動点少数以下の定義付き 
}
```
- Vector ベクトル
```ts:Vector.js
class Vector exntends Array{
   constructor(arr : Array);

   get size() : number;
   copy() : Vector;
   trans() : Vector; // 複素共役
   abs() : number; // ノルム(絶対値)
   unitVector() : Vector; // 単位ベクトル

   add(vec : Vector);
   sub(vec : Vector);
   mul(vec : number | Complex | Vector | Matrix );

   toString();
   toTex(); // MathJaxで使う用
}
```
- Matrix 行列

```ts:Matrix.ts
class Matrix extends Array{
    constructor(arr : Array);

    get rowSize() : number; // 列(縦)のサイズ
    get colSize() : number; // 行(横)のサイズ
    
    rowVector(i : number) : Vector; 
    rowVec(i : number) : Vector;
    colVector(i : number) : Vector;
    colVector(i : number) : Vector;
    setRowVector(i : number, vec : Vector);
    setRowVec(i : number, vec : Vector);
    setColVector(i : number, vec : Vector);
    setColVec(i : number, vec : Vector);

    trans() : Matrix; \\ 転地行列

    add(mat : Matrix) : Matrix;
    sub(mat : Matrix) : Matrix;
    mul(mat : number | Vector | Matrix) : Matrix;

    toString() : string;
    toTex() : string;
}
```
#### 行列用ユーティリティ
- linearAlgebra.det $(\bf A)$ 行列式

#### 逆行列 
- linearAlgebra.reverseBySweep $(\bf A)$ (ガウスジョルダンの消去法)掃き出し法による逆行列
#### LU分解
部分ピボット変換こみで下三角行列 $\bf L$ と上三角行列 $\bf U$ に分解する。
返り値は $[\bf L, \bf U, \bf P]$、 $\bf P$ はピボット変換行列である。
- linearAlgebra.LU.rightLooking $(\bf A)$ 
- linearAlgebra.LU.leftLooking $(\bf A)$
- linearAlgebra.LU.crout $(\bf A)$ クラウト法

#### 対角化
- linearAlgebra.eign.frameBastow $(\bf A)$ 返り値は $[ [\lambda ...], {\bf P} ]$、固有値方程式はフレーム法で作り、ベアストウ法で解く
- linearAlgebra.eign.power $(\bf A)$ べき乗法、返り値は $[ \lambda, {\bf v} ]$、最大固有値と固有ベクトルの組み合わせ

<!-- #### QR分解 -->
<!-- - linearAlgebra.QR.gramSchmidt $(\bf A)$ グラムシュミット法 -->
<!-- - linearAlgebra.QR.householder $(\bf A)$ ハウスホルダー法 -->

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
- sinh $(x)$ 双曲線正弦関数
- cosh $(x)$ 双曲線余弦関数
- tanh $(x)$ 双曲線正接関数

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
