import { useEffect, useState } from 'react';

const useGraphWidthResize = (parentNode: React.MutableRefObject<HTMLDivElement | null>): number => {
  const [graphWidth, setGraphWidth] = useState(0);
  const gutterSpacing = 30;

  const getGraphParentWidth = (elem: React.MutableRefObject<HTMLDivElement | null>): number =>
    (elem?.current?.clientWidth || 0) - gutterSpacing;

  useEffect(() => {
    setGraphWidth(getGraphParentWidth(parentNode));
  }, []);

  useEffect(() => {
    window.onresize = (): void => setGraphWidth(getGraphParentWidth(parentNode));
  }, [parentNode]);

  return graphWidth;
};

export { useGraphWidthResize };
