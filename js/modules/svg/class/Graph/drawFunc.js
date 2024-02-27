export default (self, func, xmin, xmax, n)=>{
    self._xmin=xmin;
    self._xmax=xmax;
    const x_points=[], y_points=[];
    const dx=(xmax-xmin)/n;
    for( let x=xmin; x<=xmax; x+=dx){
        x_points.push(x);
        y_points.push(func(x));
    }
    self._ymax=Math.max(...y_points);
    self._ymin=Math.min(...y_points);
    const scaleX=1.0/(self._xmax-self._xmin);
    const scaleY=1.0/(self._ymax-self._ymin);
    for( let i=0; i<x_points.length; i++ ){
	x_points[i]=scaleX*(x_points[i]-self._xmin);
        y_points[i]=scaleY*(y_points[i]-self._ymin);
    }
    const path=self._display.makePath(x_points, y_points);
    self.drawLabelX();
    self.drawLabelY();

    self._objects.push(path);
    return path;
}
