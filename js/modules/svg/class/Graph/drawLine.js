export default (self, x1, y1, x2, y2)=>{
    const line=self._display.makeLine(self._display.width*(x1-self.xmin)/(self.xmax-self.xmin), self._display.height*(1.0-(y1-self.ymin)/(self.ymax-self.ymin)),
                                      self._display.width*(x2-self.xmin)/(self.xmax-self.xmin), self._display.height*(1.0-(y2-self.ymin)/(self.ymax-self.ymin)));
    line.setAttribute({'stroke-width': 2, 'stroke': 'red'});
    self._objects.push(line);
    
    return line;
}
