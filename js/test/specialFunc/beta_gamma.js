const x=3.0, y=2.0;

const val1=specialFunc.beta(x, y);
const val2=specialFunc.gamma(x)*specialFunc.gamma(y)/specialFunc.gamma(x+y);

output.math(`\\beta(${x}, ${y})=${val1}`);
output.math(`\\frac{\\Gamma(${x})\\Gamma(${y})}{\\Gamma(${x+y})}=${val2}`);
