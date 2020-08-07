// 开始下拉
const PULLDOWN_START = 0;
// 下拉超过临界值
const PULLDOWN_UP = 1;
// 下拉刷新加载中
const PULLDOWN_LOADING = 2;
// 下拉刷新加载成功
const PULLDOWN_SUCCESS = 4;
// 下拉刷新加载失败
const PULLDOWN_FAIL = 8;

// 开始上拉
const PULLUP_START = 0;
// 上拉超过临界点
const PULLUP_UP = 1;
// 上拉刷新中
const PULLUP_LOADING = 2;
// 上拉加载成功
const PULLUP_SUCCESS = 4;
// 上拉加载失败
const PULLUP_FAIL = 8;
// 上拉加载后没有更多数据
const PULLUP_NODATA = 10;
export {
  // 下拉刷新状态
  PULLDOWN_START,
  PULLDOWN_UP,
  PULLDOWN_LOADING,
  PULLDOWN_SUCCESS,
  PULLDOWN_FAIL,
  // 上拉刷新状态
  PULLUP_START,
  PULLUP_UP,
  PULLUP_LOADING,
  PULLUP_SUCCESS,
  PULLUP_FAIL,
  PULLUP_NODATA
};
