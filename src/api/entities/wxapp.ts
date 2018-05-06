export interface BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: () => void;

  /**
   * 接口调用失败的回调函数
   */
  fail?: (err) => void;

  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: () => void;
}

export interface ShareOptions {

  /**
   * 分享标题, 默认为当前小程序名称
   */
  title?: string;

  /**
   * 分享描述, 默认为当前小程序名称
   */
  desc?: string;

  /**
   * 分享路径, 默认为当前页面path, 必须是以 / 开头的完整路径
   */
  path?: string;
}

export interface IData {
  [key: string]: any;
}

// ---------------------------------- 网络API列表 ----------------------------------
export interface RequestResult {

  /**
   * 开发者服务器返回的内容
   */
  data: any;
}

export interface RequestOptions extends BaseOptions {

  /**
   * 开发者服务器接口地址
   */
  url: string;

  /**
   * 请求的参数
   */
  data?: string | IData;

  /**
   * 设置请求的 header , header 中不能设置 Referer
   */
  header?: IData;

  /**
   * 默认为 GET，有效值：OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   */
  method?: string;

  /**
   * 默认为 json。如果设置了 dataType 为 json，则会尝试对响应的数据做一次 JSON.parse
   */
  dataType?: string;

  /**
   * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
   */
  success?: (res?: RequestResult) => void;
}

export interface UploadFileResult {

  /**
   * 开发者服务器返回的数据
   */
  data: string;

  /**
   * HTTP状态码
   */
  statusCode: number;
}

export interface UploadFileOptions extends BaseOptions {

  /**
   * 开发者服务器 url
   */
  url: string;

  /**
   * 要上传文件资源的路径
   */
  filePath: string;

  /**
   * 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
   */
  name: string;

  /**
   * HTTP 请求 Header , header 中不能设置 Referer
   */
  header?: IData;

  /**
   * HTTP 请求中其他额外的 form data
   */
  formData?: IData;

  /**
   * 收到开发者服务成功返回的回调函数，res = {data: '开发者服务器返回的内容'}
   */
  success?: (res?: UploadFileResult) => void;
}


export interface DownloadFileResult {

  /**
   * 文件的临时路径
   */
  tempFilePath: string;
}

export interface DownloadFileOptions extends BaseOptions {

  /**
   * 下载资源的 url
   */
  url: string;

  /**
   * HTTP 请求 Header
   */
  header?: IData;

  /**
   * 下载成功后以 tempFilePath 的形式传给页面，res = {tempFilePath: '文件的临时路径'}
   */
  success?: (res?: DownloadFileResult) => void;
}


export interface ConnectSocketOptions extends BaseOptions {

  /**
   * 开发者服务器接口地址，必须是 wss 协议，且域名必须是后台配置的合法域名
   */
  url: string;

  /**
   * 请求的数据
   */
  data?: string;

  /**
   * HTTP Header , header 中不能设置 Referer
   */
  header?: IData;

  /**
   * 默认是GET，有效值为： OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
   */
  method?: string;
}


export interface SendSocketMessageOptions extends BaseOptions {

  /**
   * 需要发送的内容
   */
  data: string | any[];
}


export interface SocketMessageResponse {

  /**
   * 服务器返回的消息
   */
  data: string | any[];
}


// ---------------------------------- 媒体API列表 ----------------------------------
export interface ChooseImageResult {

  /**
   * 本地文件路径列表
   */
  tempFilePaths: string;
}

export interface ChooseImageOptions extends BaseOptions {

  /**
   * 最多可以选择的图片张数，默认9
   */
  count?: number;

  /**
   * original 原图，compressed 压缩图，默认二者都有
   */
  sizeType?: string[];

  /**
   * album 从相册选图，camera 使用相机，默认二者都有
   */
  sourceType?: string[];

  /**
   * 成功则返回图片的本地文件路径列表 tempFilePaths
   */
  success?: (res?: ChooseImageResult) => void;
}

export interface PreviewImageOptions extends BaseOptions {

  /**
   * 当前显示图片的链接，不填则默认为 urls 的第一张
   */
  current?: string;

  /**
   * 需要预览的图片链接列表
   */
  urls: string[];
}

export interface GetImageInfoResult {

  /**
   * 图片宽度，单位px
   */
  width: number;

  /**
   * 图片高度 单位px
   */
  height: number;
}

export interface GetImageInfoOptions extends BaseOptions {

  /**
   * 图片的路径，可以是相对路径，临时文件路径，存储文件路径
   */
  src: string;

  /**
   * 接口调用成功的回调函数，包含图片信息
   */
  success?: (res?: GetImageInfoResult) => void;
}


export interface StartRecordResult {

  /**
   * 录音文件的临时路径
   */
  tempFilePath: string;
}

export interface StartRecordOptions extends BaseOptions {

  /**
   * 录音成功后调用，返回录音文件的临时文件路径，res = {tempFilePath: '录音文件的临时路径'}
   */
  success?: (res?: StartRecordResult) => void;
}


export interface PlayVoiceOptions extends BaseOptions {

  /**
   * 需要播放的语音文件的文件路径
   */
  filePath: string;
}


export interface GetBackgroundAudioPlayerStateResult {

  /**
   * 选定音频的长度（单位：s），只有在当前有音乐播放时返回
   */
  duration: number;

  /**
   * 选定音频的播放位置（单位：s），只有在当前有音乐播放时返回
   */
  currentPosition: number;

  /**
   * 播放状态（2：没有音乐在播放，1：播放中，0：暂停中）
   */
  status: number;

  /**
   * 音频的下载进度（整数，80 代表 80%），只有在当前有音乐播放时返回
   */
  downloadPercent: number;

  /**
   * 歌曲数据链接，只有在当前有音乐播放时返回
   */
  dataUrl: string;
}

export interface GetBackgroundAudioPlayerStateOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: GetBackgroundAudioPlayerStateResult) => void;
}

export interface PlayBackgroundAudioOptions extends BaseOptions {

  /**
   * 音乐链接
   */
  dataUrl: string;

  /**
   * 音乐标题
   */
  title?: string;

  /**
   * 封面URL
   */
  coverImgUrl?: string;
}


export interface SeekBackgroundAudioOptions extends BaseOptions {

  /**
   * 音乐位置，单位：秒
   */
  position: number;
}


export interface ChooseVideoResult {

  /**
   * 选定视频的临时文件路径
   */
  tempFilePath: string;

  /**
   * 选定视频的时间长度
   */
  duration: number;

  /**
   * 选定视频的数据量大小
   */
  size: number;

  /**
   * 返回选定视频的长
   */
  height: number;

  /**
   * 返回选定视频的宽
   */
  width: number;
}

export interface ChooseVideoOptions extends BaseOptions {

  /**
   * album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
   */
  sourceType?: string[];

  /**
   * 拍摄视频最长拍摄时间，单位秒。最长支持60秒
   */
  maxDuration?: number;

  /**
   * 前置或者后置摄像头，默认为前后都有，即：['front', 'back']
   */
  camera?: string[];

  /**
   * 接口调用成功，返回视频文件的临时文件路径
   */
  success?: (res?: ChooseVideoResult) => void;
}


/**
 * `audioContext` 通过 audioId 跟一个 audio 组件绑定，通过它可以操作一个 audio 组件。
 */
export interface AudioContext {

  /**
   * 音频的地址
   */
  setSrc(src: string): void;

  /**
   * 播放
   */
  play(): void;

  /**
   * 暂停
   */
  pause(): void;

  /**
   * 跳转到指定位置，单位 s
   */
  seek(position: number): void;
}


/**
 * `videoContext` 通过 videoId 跟一个 video 组件绑定，通过它可以操作一个 video 组件。
 */
export interface VideoContext {

  /**
   * 播放
   */
  play(): void;

  /**
   * 暂停
   */
  pause(): void;

  /**
   * 跳转到指定位置，单位 s
   */
  seek(position: number): void;

  /**
   * 发送弹幕，danmu 包含两个属性 text, color
   */
  sendDanmu(danmu: { text: string, color: string }): void;
}


export interface SaveFileResult {

  /**
   * 文件的保存路径
   */
  savedFilePath: string;
}

export interface SaveFileOptions extends BaseOptions {

  /**
   * 需要保存的文件的临时路径
   */
  tempFilePath: string;

  /**
   * 返回文件的保存路径，res = {savedFilePath: '文件的保存路径'}
   */
  success?: (res?: SaveFileResult) => void;
}


export interface FileListItem {

  /**
   * 文件的本地路径
   */
  filePath: string;

  /**
   * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
   */
  createTime: number;

  /**
   * 文件大小，单位B
   */
  size: number;
}

export interface GetSavedFileListResult {

  /**
   * 接口调用结果
   */
  errMsg: string;

  /**
   * 文件列表
   */
  fileList: FileListItem[];
}

export interface GetSavedFileListOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: GetSavedFileListResult) => void;
}


export interface GetSavedFileInfoResult {

  /**
   * 接口调用结果
   */
  errMsg: string;

  /**
   * 文件的保存时的时间戳，从1970/01/01 08:00:00 到当前时间的秒数
   */
  createTime: number;

  /**
   * 文件大小，单位B
   */
  size: number;
}

export interface GetSavedFileInfoOptions extends BaseOptions {

  /**
   * 文件路径
   */
  filePath: string;

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: GetSavedFileInfoResult) => void;
}


export interface RemoveSavedFileOptions extends BaseOptions {

  /**
   * 需要删除的文件路径
   */
  filePath: string;
}


export interface OpenDocumentOptions extends BaseOptions {

  /**
   * 文件路径，可通过 downFile 获得
   */
  filePath: string;
}


// ---------------------------------- 数据API列表 ----------------------------------
export interface SetStorageOptions extends BaseOptions {

  /**
   * 本地缓存中的指定的 key
   */
  key: string;

  /**
   * 需要存储的内容
   */
  data: any;
}


export interface GetStorageResult {

  /**
   * key对应的内容
   */
  data: any;
}

export interface GetStorageOptions extends BaseOptions {

  /**
   * 本地缓存中的指定的 key
   */
  key: string;

  /**
   * 接口调用的回调函数,res = {data: key对应的内容}
   */
  success?: (res?: GetStorageResult) => void;
}


export interface GetStorageInfoResult {

  /**
   * 当前storage中所有的key
   */
  keys: string[];

  /**
   * 当前占用的空间大小, 单位kb
   */
  currentSize: number;

  /**
   * 限制的空间大小，单位kb
   */
  limitSize: number;
}

export interface GetStorageInfoOptions extends BaseOptions {

  /**
   * 接口调用的回调函数
   */
  success?: (res?: GetStorageInfoResult) => void;
}

export interface RemoveStorageOptions extends BaseOptions {

  /**
   * 本地缓存中的指定的 key
   */
  key: string;
}


// ---------------------------------- 位置API列表 ----------------------------------
export interface Location {
  /**
   * 纬度，浮点数，范围为-90~90，负数表示南纬
   */
  latitude: number;

  /**
   * 经度，浮点数，范围为-180~180，负数表示西经
   */
  longitude: number;
}

export interface GetLocationResult extends Location {

  /**
   * 速度，浮点数，单位m/s
   */
  speed: number;

  /**
   * 位置的精确度
   */
  accuracy: number;
}

export interface GetLocationOptions extends BaseOptions {

  /**
   * 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 `wx.openLocation` 的坐标
   */
  type?: string;

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: GetLocationResult) => void;
}

export interface ChooseLocationResult extends Location {

  /**
   * 位置名称
   */
  name: string;

  /**
   * 详细地址
   */
  address: string;
}

export interface ChooseLocationOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: ChooseLocationResult) => void;
}


export interface OpenLocationOptions extends BaseOptions, Location {

  /**
   * 缩放比例，范围1~28，默认为28
   */
  scale?: number;

  /**
   * 位置名
   */
  name?: string;

  /**
   * 地址的详细说明
   */
  address?: string;
}


export interface GetCenterLocationOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数 ，res = { longitude: "经度", latitude: "纬度"}
   */
  success?: (res?: Location) => void;
}

/**
 * mapContext 通过 mapId 跟一个 <map/> 组件绑定，通过它可以操作对应的 <map/> 组件。
 */
export interface MapContext {

  /**
   * 获取当前地图中心的经纬度，返回的是 gcj02 坐标系，可以用于 wx.openLocation
   */
  getCenterLocation(options: GetCenterLocationOptions): void;

  /**
   * 将地图中心移动到当前定位点，需要配合map组件的show-location使用
   */
  moveToLocation(): void;
}


// ---------------------------------- 设备API列表 ----------------------------------
export interface GetNetworkTypeResult {

  /**
   * 网络类型
   */
  networkType: '2g' | '3g' | '4g' | 'wifi' | 'none' | 'unknown';
}

export interface GetNetworkTypeOptions extends BaseOptions {

  /**
   * 接口调用成功，返回网络类型 networkType
   */
  success?: (res?: GetNetworkTypeResult) => void;
}


export interface GetSystemInfoResult {

  /**
   * 手机型号
   */
  model: string;

  /**
   * 设备像素比
   */
  pixelRadio: string;

  /**
   * 窗口宽度
   */
  windowWidth: number;

  /**
   * 窗口高度
   */
  windowHeight: number;

  /**
   * 微信设置的语言
   */
  language: string;

  /**
   * 微信版本号
   */
  version: string;

  /**
   * 操作系统版本
   */
  system: string;

  /**
   * 客户端平台
   */
  platform: string;
}

export interface GetSystemInfoOptions extends BaseOptions {

  /**
   * 接口调用成功的回调
   */
  success?: (res?: GetSystemInfoResult) => void;
}


export interface AccelerometerChangeResponse {

  /**
   * X 轴
   */
  x: number;

  /**
   * Y 轴
   */
  y: number;

  /**
   * Z 轴
   */
  z: number;
}


export interface CompassChangeResponse {

  /**
   * 面对的方向度数
   */
  direction: number;
}


export interface MakePhoneCallOptions {

  /**
   * 需要拨打的电话号码
   */
  phoneNumber: string;
}

export interface ScanCodeResult {

  /**
   * 码的内容
   */
  result: string;

  /**
   * 所扫码的类型
   */
  scanType: string;

  /**
   * 所扫码的字符集
   */
  charSet: string;

  /**
   * 当所扫的码为当前小程序的合法二维码时，会返回此字段，内容为二维码携带的 path
   */
  path: string;
}

export interface ScanCodeOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: ScanCodeResult) => void;
}

export interface SetClipboardDataOptions extends BaseOptions {

  /**
   * 需要设置剪贴板的内容
   */
  data: string;
}


export interface GetClipboardDataResult {

  /**
   * 剪贴板的内容
   */
  data: string;
}

export interface GetClipboardDataOptions extends BaseOptions {

  /**
   * 需要设置剪贴板的内容
   */
  success?: (res?: GetClipboardDataResult) => void;
}


// ---------------------------------- 界面API列表 ----------------------------------
export interface ShowToastOptions extends BaseOptions {

  /**
   * 提示的内容
   */
  title: string;

  /**
   * 图标，只支持"success"、"loading"
   */
  icon?: 'success' | 'loading';

  /**
   * 提示的延迟时间，单位毫秒，默认：1500, 最大为10000
   */
  duration?: number;

  /**
   * 是否显示透明蒙层，防止触摸穿透，默认：false
   */
  mask?: boolean;
}


export interface ShowModalResult {

  /**
   * confirm==1时，表示用户点击确定按钮
   */
  confirm: number;
}

export interface ShowModalOptions extends BaseOptions {

  /**
   * 提示的标题
   */
  title: string;

  /**
   * 提示的内容
   */
  content: string;

  /**
   * 是否显示取消按钮，默认为 true
   */
  showCancel?: boolean;

  /**
   * 取消按钮的文字，默认为"取消"
   */
  cancelText?: string;

  /**
   * 取消按钮的文字颜色，默认为"#000000"
   */
  cancelColor?: string;

  /**
   * 确定按钮的文字，默认为"确定"
   */
  confirmText?: string;

  /**
   * 确定按钮的文字颜色，默认为"#3CC51F"
   */
  confirmColor?: string;

  /**
   * 接口调用成功的回调函数，返回res.confirm==1时，表示用户点击确定按钮
   */
  success?: (res?: ShowModalResult) => void;
}


export interface ShowActionSheetResult {

  /**
   * 用户是否取消选择
   */
  cancel: boolean;

  /**
   * 用户点击的按钮，从上到下的顺序，从0开始
   */
  tapIndex: number;
}

export interface ShowActionSheetOptions extends BaseOptions {

  /**
   * 按钮的文字数组，数组长度最大为6个
   */
  itemList: string[];

  /**
   * 按钮的文字颜色，默认为"#000000"
   */
  itemColor?: string;

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: ShowActionSheetResult) => void;
}


export interface SetNavigationBarTitleOptions extends BaseOptions {

  /**
   * 页面标题
   */
  title: string;
}

export interface NavigateToOptions extends BaseOptions {

  /**
   * 需要跳转的应用内页面的路径 , 路径后可以带参数。
   * 参数与路径之间使用?分隔，参数键与参数值用=相连，不同参数用&分隔；如 'path?key=value&key2=value2'
   */
  url: string;
}

export interface RedirectToOptions extends BaseOptions {

  /**
   * 需要跳转的应用内页面的路径
   */
  url: string;
}


export interface SwitchTabOptions extends BaseOptions {

  /**
   * 需要跳转的 tabBar 页面的路径（需在 app.json 的 tabBar 字段定义的页面），路径后不能带参数
   */
  url: string;
}


export interface NavigateBackOptions {

  /**
   * 返回的页面数，如果 delta 大于现有页面数，则返回到首页。默认值为1。
   */
  delta?: number;
}

/**
 * 动画实例可以调用以下方法来描述动画，调用结束后会返回自身，支持链式调用的写法。
 */
export interface Animation {

  /**
   * 表示一组动画完成，可以在一组动画中调用任意多个动画方法，一组动画中的所有动画会同时开始，一组动画完成后才会进行下一组动画。
   */
  step(options: AnimationOptions): void;

  /**
   * 导出动画数据传递给组件的animation属性
   */
  export(): any;

  // 样式
  /**
   * 透明度，参数范围 0~1
   */
  opacity(value: number): this;

  /**
   * 颜色值
   */
  backgroundColor(color: string): this;

  /**
   * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
   */
  width(value: number | string): this;

  /**
   * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
   */
  height(value: number | string): this;

  /**
   * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
   */
  top(value: number | string): this;

  /**
   * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
   */
  left(value: number | string): this;

  /**
   * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
   */
  bottom(value: number | string): this;

  /**
   * 长度值，如果传入 number 则默认使用 px，可传入其他自定义单位的长度值
   */
  right(value: number | string): this;

  // 旋转
  /**
   * deg的范围-180~180，从原点顺时针旋转一个deg角度
   */
  rotate(value: number): this;

  /**
   * deg的范围-180~180，在X轴旋转一个deg角度
   */
  rotateX(value: number): this;

  /**
   * deg的范围-180~180，在Y轴旋转一个deg角度
   */
  rotateY(value: number): this;

  /**
   * deg的范围-180~180，在Z轴旋转一个deg角度
   */
  rotateZ(value: number): this;

  /**
   * 同 [transform-function rotate3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/rotate3d?t=1477656494026)
   */
  rotate3d(x: number, y: number, z: number, a: number): this;

  // 缩放
  /**
   * 一个参数时，表示在X轴、Y轴同时缩放sx倍数；两个参数时表示在X轴缩放sx倍数，在Y轴缩放sy倍数
   */
  scale(sx: number, sy?: number): this;

  /**
   * 在X轴缩放sx倍数
   */
  scaleX(sx: number): this;

  /**
   * 在Y轴缩放sy倍数
   */
  scaleY(sy: number): this;

  /**
   * 在Z轴缩放sz倍数
   */
  scaleZ(sz: number): this;

  /**
   * 在X轴缩放sx倍数，在Y轴缩放sy倍数，在Z轴缩放sz倍数
   */
  scale3d(sx: number, sy: number, sz: number): this;

  // 偏移
  /**
   * 一个参数时，表示在X轴偏移tx，单位px；两个参数时，表示在X轴偏移tx，在Y轴偏移ty，单位px。
   */
  translate(tx: number, ty?: number): this;

  /**
   * 在X轴偏移tx，单位px
   */
  translateX(tx: number): this;

  /**
   * 在Y轴偏移ty，单位px
   */
  translateY(ty: number): this;

  /**
   * 在Z轴偏移tz，单位px
   */
  translateZ(tz: number): this;

  /**
   * 在X轴偏移tx，在Y轴偏移ty，在Z轴偏移tz，单位px
   */
  translate3d(tx: number, ty: number, tz: number): this;

  // 倾斜
  /**
   * 参数范围-180~180；一个参数时，Y轴坐标不变，X轴坐标延顺时针倾斜ax度；两个参数时，分别在X轴倾斜ax度，在Y轴倾斜ay度
   */
  skew(ax: number, ay?: number): this;

  /**
   * 参数范围-180~180；Y轴坐标不变，X轴坐标延顺时针倾斜ax度
   */
  skewX(ax: number): this;

  /**
   * 参数范围-180~180；X轴坐标不变，Y轴坐标延顺时针倾斜ay度
   */
  skewY(ay: number): this;

  // 矩阵变形
  /**
   * 同 [transform-function matrix](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix?t=1477656494026)
   */
  matrix(a: number, b: number, c: number, d: number, tx: number, ty: number): this;

  /**
   * 同 [transform-function matrix3d](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function/matrix3d?t=1477656494026)
   */
  matrix3d(a1: number, b1: number, c1: number, d1: number, a2: number, b2: number, c2: number, d2: number,
           a3: number, b3: number, c3: number, d3: number, a4: number, b4: number, c4: number, d4: number): this;
}

export interface AnimationOptions {

  /**
   * 动画持续时间，单位ms，默认值 400
   */
  duration?: number;

  /**
   * 定义动画的效果，默认值"linear"
   */
  timingFunction?: 'linear' | 'ease' | 'ease-in' | 'ease-in-out' | 'ease-out' | 'step-start' | 'step-end';

  /**
   * 动画延迟时间，单位 ms，默认值 0
   */
  delay?: number;

  /**
   * 设置transform-origin，默认为"50% 50% 0"
   */
  transformOrigin?: string;
}


export interface CanvasContext {

  /**
   * 获取当前 `context` 上存储的绘图动作
   */
  getActions(): any[];

  /**
   * 清空当前的存储绘图动作
   */
  clearActions(): void;

  // 变形
  /**
   * 在调用 `scale` 方法后，之后创建的路径其横纵坐标会被缩放。多次调用 `scale`，倍数会相乘。
   * @param scaleWidth 横坐标缩放的倍数
   * @param scaleHeight 纵坐标轴缩放的倍数
   */
  scale(scaleWidth: number, scaleHeight: number): void;

  /**
   * 以原点为中心，原点可以用 translate方法修改。顺时针旋转当前坐标轴。多次调用rotate，旋转的角度会叠加。
   * @param rotate 旋转角度，以弧度计，范围为 0 ~ 2π
   */
  rotate(rotate: number): void;

  /**
   * 对当前坐标系的原点(0, 0)进行变换，默认的坐标系原点为页面左上角。
   * @param x 水平坐标平移量
   * @param y 竖直坐标平移量
   */
  translate(x: number, y: number): void;

  /**
   * 保存当前坐标轴的缩放、旋转、平移信息
   */
  save(): void;

  /**
   * 恢复之前保存过的坐标轴的缩放、旋转、平移信息
   */
  restore(): void;

  // 绘制
  /**
   * 清除画布上在该矩形区域内的内容。
   * @param x 矩形区域左上角的x坐标
   * @param y 矩形区域左上角的y坐标
   * @param width 矩形区域的宽度
   * @param height 矩形区域的高度
   */
  clearRect(x: number, y: number, width: number, height: number): void;

  /**
   * 在画布上绘制被填充的文本。
   * @param text 在画布上输出的文本
   * @param x    绘制文本的左上角x坐标位置
   * @param y 绘制文本的左上角y坐标位置
   */
  fillText(text: string, x: number, y: number): void;

  /**
   * 绘制图像，图像保持原始尺寸。
   * @param imageResource 所要绘制的图片资源，通过 `chooseImage` 得到一个文件路径或者一个项目目录内的图片
   * @param x 图像左上角的x坐标
   * @param y 图像左上角的y坐标
   */
  drawImage(imageResource: string, x: number, y: number, width: number, height: number): void;

  /**
   * 对当前路径进行填充
   */
  fill(): void;
  /**
   * 对当前路径进行描边
   */
  stroke(): void;

  // 路径后可以带参数。
  /**
   * 开始创建一个路径，需要调用fill或者stroke才会使用路径进行填充或描边。
   * 同一个路径内的多次 `setFillStyle`、`setStrokeStyle`、`setLineWidth` 等设置，以最后一次设置为准。
   */
  beginPath(): void;

  /**
   * 关闭一个路径
   */
  closePath(): void;

  /**把路径移动到画布中的指定点，不创建线条。
   * @param x 目标位置的x坐标
   * @param y 目标位置的y坐标
   */
  moveTo(x: number, y: number): void;

  /**
   * 在当前位置添加一个新点，然后在画布中创建从该点到最后指定点的路径。
   * @param x 目标位置的x坐标
   * @param y 目标位置的y坐标
   */
  lineTo(x: number, y: number): void;

  /**
   * 画一条弧线。
   * 创建一个圆可以用 arc() 方法指定其实弧度为0，终止弧度为 2 * Math.PI。
   * 用 stroke() 或者 fill() 方法来在 canvas 中画弧线。
   * @param x 圆的x坐标
   * @param y 圆的y坐标
   * @param r 圆的半径
   * @param sAngle 起始弧度，单位弧度（在3点钟方向）
   * @param eAngle 终止弧度
   * @param counterclockwise 可选。指定弧度的方向是逆时针还是顺时针。默认是false，即顺时针。
   */
  arc(x: number, y: number, r: number, sAngle: number, eAngle: number, counterclockwise?: boolean): void;

  /**
   * 添加一个矩形路径到当前路径。
   * @param x 矩形路径左上角的x坐标
   * @param y 矩形路径左上角的y坐标
   * @param width 矩形路径的宽度
   * @param height 矩形路径的高度
   */
  rect(x: number, y: number, width: number, height: number): void;

  /**
   * 填充一个矩形。用 setFillStyle() 设置矩形的填充色，如果没设置默认是黑色。
   * @param x 矩形路径左上角的x坐标
   * @param y 矩形路径左上角的y坐标
   * @param width 矩形路径的宽度
   * @param height 矩形路径的高度
   */
  fillRect(x: number, y: number, width: number, height: number): void;

  /**
   * 画一个矩形(非填充)。用 setFillStroke() 设置矩形线条的颜色，如果没设置默认是黑色。
   * @param x 矩形路径左上角的x坐标
   * @param y 矩形路径左上角的y坐标
   * @param width 矩形路径的宽度
   * @param height 矩形路径的高度
   */
  strokeRect(x: number, y: number, width: number, height: number): void;

  /**
   * 创建二次贝塞尔曲线路径。
   * @param cpx 贝塞尔控制点的x坐标
   * @param cpy 贝塞尔控制点的y坐标
   * @param x 结束点的x坐标
   * @param y 结束点的y坐标
   */
  quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;

  /**
   * 创建三次方贝塞尔曲线路径。
   * @param cp1x 第一个贝塞尔控制点的 x 坐标
   * @param cp1y 第一个贝塞尔控制点的 y 坐标
   * @param cp2x 第二个贝塞尔控制点的 x 坐标
   * @param cp2y 第二个贝塞尔控制点的 y 坐标
   * @param x 结束点的x坐标
   * @param y 结束点的y坐标
   */
  bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;

  // 样式
  /**
   * 设置纯色填充。
   * @param color 设置为填充样式的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
   */
  setFillStyle(color: string): void;

  /**
   * 设置纯色描边
   * @param color 设置为填充样式的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
   */
  setStrokeStyle(color: string): void;

  /**
   * 设置全局画笔透明度。
   * @param alpha 透明度，0 表示完全透明，1 表示完全不透明
   */
  setGlobalAlpha(alpha: number): void;

  /**
   * 设置阴影样式。
   * @param offsetX 阴影相对于形状在水平方向的偏移
   * @param offsetY 阴影相对于形状在竖直方向的偏移
   * @param blur 阴影的模糊级别，数值越大越模糊(0~100)
   * @param color 阴影的颜色('rgb(255, 0, 0)'或'rgba(255, 0, 0, 0.6)'或'#ff0000'格式的颜色字符串)
   */
  setShadow(offsetX: number, offsetY: number, blur: number, color: string): void;

  /**
   * 创建一个线性的渐变颜色。需要使用 addColorStop() 来指定渐变点，至少要两个。
   * @param x0 起点的x坐标
   * @param y0 起点的y坐标
   * @param x1 终点的x坐标
   * @param y1 终点的y坐标
   */
  createLinearGradient(x0: number, y0: number, x1: number, y1: number): void;

  /**
   * 创建一个圆形的渐变颜色。起点在圆心，终点在圆环。需要使用 addColorStop() 来指定渐变点，至少要两个。
   * @param x 圆心的x坐标
   * @param y 圆心的y坐标
   * @param r 圆的半径
   */
  createCircularGradient(x: number, y: number, r: number): void;

  /**
   * 设置字体的字号。
   * @param fontSize 字体的字号
   */
  setFontSize(fontSize: number): void;

  /**
   * 设置线条的宽度。
   * @param lineWidth 线条的宽度
   */
  setLineWidth(lineWidth: number): void;

  /**
   * 设置线条的结束端点样式。
   * @param lineCap 线条的结束端点样式('butt'、'round'、'square')
   */
  setLineCap(lineCap: string): void;

  /**
   * 设置两条线相交时，所创建的拐角类型。
   * @param lineJoin 两条线相交时，所创建的拐角类型('bevel'、'round'、'miter')
   */
  setLineJoin(lineJoin: string): void;

  /**设置最大斜接长度，斜接长度指的是在两条线交汇处内角和外角之间的距离。 当setLineJoin为'miter'时才有效。超过最大倾斜长度的，连接处将以lineJoin为bevel来显示
   * @param miterLimit 最大斜接长度
   */
  setMiterLimit(miterLimit: number): void;
}


export interface DrawCanvasOptions {

  /**
   * 画布标识，传入 <canvas/> 的 cavas-id
   */
  canvasId: string;

  /**
   * 绘图动作数组，由 wx.createContext 创建的 context，调用 getActions 方法导出绘图动作数组。
   */
  actions: any[];

  /**
   * 本次绘制是否接着上一次绘制，即reserve参数为false，则在本次调用drawCanvas绘制之前native层应先清空画布再继续绘制；
   * 若reserver参数为true，则保留当前画布上的内容，本次调用drawCanvas绘制的内容覆盖在上面，默认 false
   */
  reserve?: boolean;
}


export interface CanvasToTempFilePathOptions {

  /**
   * 画布标识，传入 <canvas/> 的 cavas-id
   */
  canvasId: string;
}


// ---------------------------------- 开放接口API列表 ----------------------------------
export interface LoginResult {

  /**
   * 调用结果
   */
  errMsg: string;

  /**
   * 用户允许登录后，回调内容会带上 code（有效期五分钟），开发者需要将 code 发送到开发者服务器后台，
   * 使用 `code` 换取 `session_key` api，将 code 换成 openid 和 session_key
   */
  code: string;
}

export interface LoginOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: LoginResult) => void;
}


export interface CheckSessionOptions extends BaseOptions {
}


export interface GetUserInfoResult {

  /**
   * 用户信息对象，不包含 openid 等敏感信息
   */
  userInfo: UserInfo;

  /**
   * 不包括敏感信息的原始数据字符串，用于计算签名。
   */
  rawData: string;

  /**
   * 使用 sha1( rawData + sessionkey ) 得到字符串，用于校验用户信息。
   */
  signature: string;

  /**
   * 包括敏感数据在内的完整用户信息的加密数据，详细见加密数据解密算法
   */
  encryptData: string;
}

/**
 * 用户信息
 */
export interface UserInfo {

  /**
   * 用户昵称
   */
  nickName: string;

  /**
   * 头像地址
   */
  avatarUrl: string;

  /**
   * 性别 0：未知、1：男、2：女
   */
  gender: number;

  /**
   * 省份
   */
  province: string;

  /**
   * 城市
   */
  city: string;

  /**
   * 国家
   */
  country: string;
}

export interface GetUserInfoOptions extends BaseOptions {

  /**
   * 接口调用成功的回调函数
   */
  success?: (res?: GetUserInfoResult) => void;
}


export interface RequestPaymentOptions extends BaseOptions {

  /**
   * 时间戳从1970年1月1日00:00:00至今的秒数,即当前的时间
   */
  timeStamp: number;

  /**
   * 随机字符串，长度为32个字符以下。
   */
  nonceStr: string;

  /**
   * 统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=*
   */
  package: string;

  /**
   * 签名算法，暂支持 MD5
   */
  signType: string;

  /**
   * 签名,具体签名方案参见[微信公众号支付帮助文档](https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=4_3&t=1477656495417)
   */
  paySign: string;
}
