import { useCallback, useEffect, useState } from "react";

function getWindow(): Window | undefined {
  return globalThis.window;
}

/**
 * 这个函数会返回一个数值和一个函数
 * 数值是当前的路由，函数是用来改变路由的
 * @returns [当前路由, 改变路由的函数]
 */
export function useRouter(
  defaultPageId?: string
): [string, (newState: string) => void] {
  const pathFromWindowLocation =
    defaultPageId === undefined
      ? getWindow()?.location.pathname.split("/")[1] ?? "home"
      : defaultPageId === ""
      ? "home"
      : defaultPageId;

  const original: string = pathFromWindowLocation;
  const [path, setPath] = useState<string>(original);

  useEffect(() => {
    const listener = function () {
      const hash = pathFromWindowLocation;
      setPath(hash);
    };
    getWindow()?.addEventListener("popstate", listener, false);

    return () => {
      getWindow()?.removeEventListener("popstate", listener, false);
    };
  }, []);

  return [
    path,
    useCallback(
      function (newPath: string) {
        getWindow()?.history.pushState(null, "", "/" + newPath);
        setPath(newPath);
      },
      [setPath]
    ),
  ];
}
