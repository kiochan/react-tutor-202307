import { useCallback, useEffect, useState } from "react";

/**
 * 这个函数会返回一个数值和一个函数
 * 数值是当前的路由，函数是用来改变路由的
 * @returns [当前路由, 改变路由的函数]
 */
export function useRouter(): [string, (newState: string) => void] {
  const original: string = window.location.hash.replace(/^#/, "");
  const [hash, setHash] = useState(original);

  useEffect(() => {
    const listener = function () {
      const hash = window.location.hash.replace(/^#/, "");
      setHash(hash);
    };
    window.addEventListener("popstate", listener, false);

    return () => {
      window.removeEventListener("popstate", listener, false);
    };
  }, []);

  return [
    hash,
    useCallback(
      function (newState: string) {
        window.location.hash = newState;
        setHash(newState);
      },
      [window.location.hash, setHash]
    ),
  ];
}
