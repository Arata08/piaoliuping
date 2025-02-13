import * as vue from 'vue';
import { ExtractPropTypes, SetupContext, PropType, CSSProperties, StyleValue, Ref, InjectionKey, VNodeChild, VNode, RendererNode, RendererElement } from 'vue';
import { ButtonOpenType, ButtonLang, ButtonOnGetphonenumberEvent, ButtonOnErrorEvent, ButtonOnOpensettingEvent, ButtonOnLaunchappEvent, ButtonOnChooseavatarEvent, ButtonOnAgreeprivacyauthorizationEvent, ButtonOnAddgroupappEvent, ButtonOnChooseaddressEvent, ButtonOnChooseinvoicetitleEvent, ButtonOnSubscribeEvent, ButtonOnLoginEvent, BaseEvent, InputOnBlurEvent, InputOnFocusEvent, InputOnConfirmEvent, InputOnInputEvent, TextareaOnBlurEvent, TextareaOnFocusEvent, TextareaOnConfirmEvent, TextareaOnInputEvent } from '@uni-helper/uni-app-types';
import { ComponentResolver } from '@uni-helper/vite-plugin-uni-components';

type Interceptor = (...args: any[]) => Promise<boolean> | boolean | undefined | void;

/**
 * prop type helpers
 * help us to write less code and reduce bundle size
 * copy from https://github.com/youzan/vant/blob/main/packages/vant/src/utils/props.ts
 */

type ClassType = string | object | Array<ClassType>;

declare const transitionProps: {
    /**
     * @description 内置动画名称，可选值为 `fade` `fade-up` `fade-down` f`ade-left` `fade-right` `slide-up` `slide-down` `slide-left` `slide-right`
     */
    name: {
        type: vue.PropType<"none" | "zoom" | "fade" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right">;
        default: "none" | "zoom" | "fade" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right";
    };
    /**
     * @description 是否展示过渡动画级
     */
    show: BooleanConstructor;
    /**
     * @description 动画时长，单位为毫秒
     */
    duration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 动画函数
     */
    timingFunction: {
        type: vue.PropType<"ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear">;
        default: "ease" | "ease-in" | "ease-in-out" | "ease-out" | "step-end" | "step-start" | "linear";
    };
    destroyOnClose: BooleanConstructor;
    /**
     * @description 进入动画前的类名
     */
    enterFromClass: StringConstructor;
    /**
     * @description 进入动画时的类名
     */
    enterActiveClass: StringConstructor;
    /**
     * @description 进入动画后的类名
     */
    enterToClass: StringConstructor;
    /**
     * @description 离开动画前的类名
     */
    leaveFromClass: StringConstructor;
    /**
     * @description 离开动画时的类名
     */
    leaveActiveClass: StringConstructor;
    /**
     * @description 离开动画后的类名
     */
    leaveToClass: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
declare const transitionEmits: {
    beforeEnter: () => boolean;
    enter: () => boolean;
    afterEnter: () => boolean;
    beforeLeave: () => boolean;
    leave: () => boolean;
    afterLeave: () => boolean;
    click: (evt: MouseEvent) => boolean;
};
type TransitionProps = ExtractPropTypes<typeof transitionProps>;
type TransitionEmits = typeof transitionEmits;

declare const defaultAnimations: NutAnimations;
declare function isKeyOfAnimations(value: string): boolean;
interface IClassNames {
    enter: string;
    enterActive: string;
    enterTo: string;
    leave: string;
    leaveActive: string;
    leaveTo: string;
}
interface IClassNameProps {
    enterClass?: string;
    enterActiveClass?: string;
    enterToClass?: string;
    leaveClass?: string;
    leaveActiveClass?: string;
    leaveToClass?: string;
}
declare function getClassNames(name: string, { enterClass, enterActiveClass, enterToClass, leaveClass, leaveActiveClass, leaveToClass, }: IClassNameProps): IClassNames;
declare function useTransition(props: TransitionProps, emit: SetupContext<TransitionEmits>['emit']): {
    display: vue.Ref<boolean>;
    classes: vue.ComputedRef<string>;
    styles: vue.ComputedRef<string>;
    clickHandler: (evt: any) => void;
};

type TransitionName = keyof typeof defaultAnimations;
interface NutAnimation {
    enter: string;
    leave: string;
}
declare const nutAnimationName: readonly ["fade", "fade-up", "fade-down", "fade-left", "fade-right", "slide-up", "slide-down", "slide-left", "slide-right", "zoom", "none"];
type NutAnimationName = (typeof nutAnimationName)[number];
declare const nutAnimationtimingFunction: readonly ["linear", "ease", "ease-in", "ease-in-out", "ease-out", "step-start", "step-end"];
type NutAnimationtimingFunction = (typeof nutAnimationtimingFunction)[number];
interface NutAnimations {
    [key: string]: NutAnimation;
}

type Position = 'center' | 'top' | 'bottom' | 'left' | 'right';

interface ActionSheetOption {
    disable?: boolean;
    loading?: boolean;
    color?: string;
    name: string;
    subname?: string;
}
declare const actionsheetProps: {
    /**
     * @description 是否显示圆角
     */
    round: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否开启 iPhone 系列全面屏底部安全区适配，仅当 `position` 为 `bottom` 时有效
     */
    safeAreaInsetBottom: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 遮罩显示时的背景是否锁定
     */
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自定义 popup 弹框样式
     */
    popStyle: {
        type: PropType<CSSProperties>;
    };
    /**
     * @description 取消文案
     */
    cancelTxt: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 设置列表项标题展示使用参数
     */
    optionTag: {
        type: PropType<keyof ActionSheetOption>;
        default: keyof ActionSheetOption;
    };
    /**
     * @description 设置列表项二级标题展示使用参数
     */
    optionSubTag: {
        type: PropType<keyof ActionSheetOption>;
        default: keyof ActionSheetOption;
    };
    /**
     * @description 设置选中项的值，和 'option-tag' 的值对应
     */
    chooseTagValue: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 设置列表项标题
     */
    title: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 选中项颜色，当 choose-tag-value == option-tag 的值 生效
     */
    customColor: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 设置列表项副标题/描述
     */
    description: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 列表项
     */
    menuItems: {
        type: PropType<ActionSheetOption[]>;
        default: () => ActionSheetOption[];
    };
    /**
     * @description 遮罩层是否可关闭
     */
    closeAbled: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
    position: {
        type: PropType<Position>;
        default: Position;
    };
    transition: {
        type: PropType<NutAnimationName>;
        default: string;
    };
    popClass: {
        type: PropType<string>;
        default: string;
    };
    closeable: BooleanConstructor;
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    closeIconPosition: {
        type: PropType<"top-right" | "bottom-right" | "bottom-left" | "top-left">;
        default: "top-right" | "bottom-right" | "bottom-left" | "top-left";
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: true;
    };
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: true;
    };
    visible: BooleanConstructor;
    zIndex: NumberConstructor;
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    overlayStyle: PropType<CSSProperties>;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
};
type ActionsheetProps = ExtractPropTypes<typeof actionsheetProps>;
declare const actionsheetEmits: {
    close: () => boolean;
    "update:visible": (val: boolean) => boolean;
    cancel: () => boolean;
    choose: (item: ActionSheetOption, index: number) => boolean;
};
type ActionsheetEmits = typeof actionsheetEmits;

interface AddressRegionData {
    name: string;
    [key: string]: any;
}
interface CustomRegionData {
    title: string;
    list: any[];
}
interface AddressExistRegionData {
    id?: string | number;
    provinceName: string;
    cityName: string;
    countyName: string;
    townName: string;
    addressDetail: string;
    selectedAddress: boolean;
    [key: string]: any;
}
declare const addressType: readonly ["exist", "custom", "custom2"];
type AddressType = (typeof addressType)[number];

declare const addressProps: {
    /**
     * @description 设置默认选中值
     */
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否打开地址选择
     */
    visible: BooleanConstructor;
    /**
     * @description 地址选择类型：'exist' | 'custom' | 'custom2'
     */
    type: {
        type: vue.PropType<"exist" | "custom" | "custom2">;
        default: "exist" | "custom" | "custom2";
    };
    /**
     * @description 自定义地址选择标题
     */
    customAddressTitle: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 省份数据
     */
    province: {
        type: vue.PropType<AddressRegionData[]>;
        default: () => AddressRegionData[];
    };
    /**
     * @description 城市数据
     */
    city: {
        type: vue.PropType<AddressRegionData[]>;
        default: () => AddressRegionData[];
    };
    /**
     * @description 县区数据
     */
    country: {
        type: vue.PropType<AddressRegionData[]>;
        default: () => AddressRegionData[];
    };
    /**
     * @description 乡镇数据
     */
    town: {
        type: vue.PropType<AddressRegionData[]>;
        default: () => AddressRegionData[];
    };
    /**
     * @description 是否显示 '选择其他地区' 按钮。仅在类型为 'exist' 时生效
     */
    isShowCustomAddress: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 现存地址列表
     */
    existAddress: {
        type: vue.PropType<AddressExistRegionData[]>;
        default: () => AddressExistRegionData[];
    };
    /**
     * @description 已有地址标题
     */
    existAddressTitle: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 切换自定义地址和已有地址的按钮标题
     */
    customAndExistTitle: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 弹层中内容容器的高度
     */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 列提示文字
     */
    columnsPlaceholder: {
        type: (ArrayConstructor | StringConstructor)[];
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
    position: {
        type: vue.PropType<Position>;
        default: Position;
    };
    transition: {
        type: vue.PropType<NutAnimationName>;
        default: string;
    };
    popClass: {
        type: vue.PropType<string>;
        default: string;
    };
    round: BooleanConstructor;
    closeable: BooleanConstructor;
    closeIcon: {
        type: vue.PropType<string>;
        default: string;
    };
    closeIconPosition: {
        type: vue.PropType<"top-right" | "bottom-right" | "bottom-left" | "top-left">;
        default: "top-right" | "bottom-right" | "bottom-left" | "top-left";
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: true;
    };
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    safeAreaInsetBottom: BooleanConstructor;
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: true;
    };
    zIndex: NumberConstructor;
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    overlayClass: {
        type: vue.PropType<string>;
        default: string;
    };
    overlayStyle: vue.PropType<vue.CSSProperties>;
    lockScroll: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
};
type AddressProps = ExtractPropTypes<typeof addressProps>;
declare const addressEmits: {
    "update:visible": (val: boolean) => boolean;
    "update:modelValue": () => boolean;
    close: (val: {
        data: any;
        type: string;
    }) => boolean;
    change: (val: {
        next?: string;
        value?: AddressRegionData;
        custom: string;
    }) => boolean;
    switchModule: (val: {
        type: AddressType;
    }) => boolean;
    closeMask: (val: {
        closeWay: "self" | "mask" | "cross";
    }) => boolean;
    selected: (prevExistAdd: AddressExistRegionData, item: AddressExistRegionData, copyExistAdd: AddressExistRegionData[]) => boolean;
};
type AddressEmits = typeof addressEmits;

interface AddressListOptions {
    [key: string]: string;
}

declare const addresslistProps: {
    /**
     * @description 地址数组
     */
    data: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 长按功能
     */
    longPress: BooleanConstructor;
    /**
     * @description 右滑功能
     */
    swipeEdition: BooleanConstructor;
    /**
     * @description 是否展示底部按钮
     */
    showBottomButton: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自定义 `key` 值时，设置映射关系
     */
    options: {
        type: vue.PropType<AddressListOptions>;
        default: () => AddressListOptions;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type AddressListProps = ExtractPropTypes<typeof addresslistProps>;
declare const addresslistEmits: {
    delIcon: (val: Event, item: unknown, index: number | string) => boolean;
    editIcon: (val: Event, item: unknown, index: number | string) => boolean;
    clickItem: (val: Event, item: unknown, index: number | string) => boolean;
    longCopy: (val: Event, item: unknown, index: number | string) => boolean;
    longSet: (val: Event, item: unknown, index: number | string) => boolean;
    longDel: (val: Event, item: unknown, index: number | string) => boolean;
    swipeDel: (val: Event, item: unknown, index: number | string) => boolean;
    add: (val: Event) => boolean;
};
type AddressListEmits = typeof addresslistEmits;

declare const animateProps: {
    /**
     * @description 控制动画，当值从 false 变为 true 时会触发一次动画
     */
    show: BooleanConstructor;
    /**
     * @description 动画类型
     * @values 'fade', 'slide', 'zoom', ...
     */
    type: {
        type: vue.PropType<"" | "slide-left" | "slide-right" | "shake" | "ripple" | "breath" | "float" | "slide-top" | "slide-bottom" | "jump" | "twinkle" | "flicker">;
        default: "" | "slide-left" | "slide-right" | "shake" | "ripple" | "breath" | "float" | "slide-top" | "slide-bottom" | "jump" | "twinkle" | "flicker";
    };
    /**
     * @description 是否循环执行。`true`-循环执行; `false`-执行一次
     */
    loop: BooleanConstructor;
    /**
     * @description 动画时长，单位 ms
     */
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description （不能与 show 同时使用）触发方式，`initial`-初始化执行; `click`-点击执行
     * @values 'initial', 'click'
     * @default initial
     */
    action: {
        type: vue.PropType<"" | "click" | "initial">;
        default: "" | "click" | "initial";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type AnimateProps = ExtractPropTypes<typeof animateProps>;
declare const animateEmits: {
    click: (evt: MouseEvent) => boolean;
    animate: () => boolean;
};
type AnimateEmits = typeof animateEmits;

declare const avatarProps: {
    /**
     * @description 头像的大小，可选值为：`large`、`normal`、`small`，支持直接输入数字
     */
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string | number | undefined;
    };
    /**
     * @description 头像的形状，可选值为：`square`、`round`
     */
    shape: {
        type: vue.PropType<"round" | "square" | undefined>;
        default: "round" | "square" | undefined;
    };
    /**
     * @description 背景色
     */
    bgColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 字体颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type AvatarProps = ExtractPropTypes<typeof avatarProps>;

declare const avatarSize: readonly ["large", "normal", "small"];
type AvatarSize = (typeof avatarSize)[number];
declare const avatarShape: readonly ["round", "square"];
type AvatarShape = (typeof avatarShape)[number];
interface AvatarFinalSize {
    /**
     * 是否为预设尺寸
     */
    preset: boolean;
    /**
     * 尺寸值
     */
    value: string;
}

declare const AVATAR_GROUP_KEY: unique symbol;
declare const avatargroupProps: {
    /**
     * @description 显示的最大头像个数
     */
    maxCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 头像数量超出时，会出现一个头像折叠元素，该元素内容可为`...`、`more`、`+N`
     */
    maxContent: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 头像的大小，可选值为：`large`、`normal`、`small`，支持直接输入数字
     */
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string | number;
    };
    /**
     * @description 头像的形状，可选值为：`square`、`round`
     */
    shape: {
        type: vue.PropType<"round" | "square">;
        default: "round" | "square";
    };
    /**
     * @description 头像折叠元素的字体颜色
     */
    maxColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 头像折叠元素的背景色
     */
    maxBgColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 头像之间的间距
     */
    span: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 组合头像之间的层级方向，可选值为：`left`、`right`
     */
    zIndex: {
        type: vue.PropType<"left" | "right">;
        default: "left" | "right";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type AvatarGroupProps = ExtractPropTypes<typeof avatargroupProps>;

declare const backtopProps: {
    /**
     * @description 滚动区域的高度
     */
    height: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 距离页面底部距离
     */
    bottom: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 距离页面右侧距离
     */
    right: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 页面垂直滚动多高后出现
     */
    distance: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 设置组件页面层级
     */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 自定义图标颜色
     */
    customColor: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type BacktopProps = ExtractPropTypes<typeof backtopProps>;
declare const backtopEmits: {
    click: (evt: MouseEvent) => boolean;
};
type BacktopEmits = typeof backtopEmits;

declare const badgeProps: {
    /**
     * @description 显示的内容
     */
    value: (NumberConstructor | StringConstructor)[];
    /**
     * @description `value` 为数值时，最大值
     */
    max: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否为小点
     */
    dot: BooleanConstructor;
    /**
     * @description 是否为气泡形状
     * @since >v4.0.0
     */
    bubble: BooleanConstructor;
    /**
     * @description 是否隐藏
     */
    hidden: BooleanConstructor;
    /**
     * @description 上下偏移量，支持单位设置，可设置为：`5px` 等
     */
    top: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 左右偏移量，支持单位设置，可设置为：`5px` 等
     */
    right: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 徽标的 `z-index` 值
     */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 徽标背景颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type BadgeProps = ExtractPropTypes<typeof badgeProps>;

declare const barrageProps: {
    /**
     * @description 弹幕列表数据
     */
    danmu: {
        type: vue.PropType<string[]>;
        default: () => string[];
    };
    /**
     * @description 可视区域内每个弹幕出现的时间间隔
     */
    frequency: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 每个弹幕的滚动时间
     */
    speeds: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 弹幕行数，分几行展示
     */
    rows: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 弹幕垂直距离
     */
    top: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否循环播放
     */
    loop: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type BarrageProps = ExtractPropTypes<typeof barrageProps>;
interface BarrageInst {
    add: (word: string) => void;
}

declare const buttonProps: {
    /**
     * @description 指定按钮按下去的样式类
     */
    readonly hoverClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 按住后多久出现点击态，单位毫秒
     */
    readonly hoverStartTime: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 手指松开后点击态保留时间，单位毫秒
     */
    readonly hoverStayTime: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 按钮颜色，支持传入 `linear-gradient` 渐变色
     */
    readonly customColor: StringConstructor;
    /**
     * @description 形状，可选值为 `square` `round`
     */
    readonly shape: {
        type: PropType<"round" | "square">;
        default: "round" | "square";
    };
    /**
     * @description 是否为朴素按钮
     */
    readonly plain: BooleanConstructor;
    /**
     * @description 按钮 `loading` 状态
     */
    readonly loading: BooleanConstructor;
    /**
     * @description 是否禁用按钮
     */
    readonly disabled: BooleanConstructor;
    /**
     * @description 按钮类型，可选值为 `primary` `info` `warning` `danger` `success` `default`
     */
    readonly type: {
        type: PropType<"default" | "primary" | "info" | "success" | "warning" | "danger">;
        default: "default" | "primary" | "info" | "success" | "warning" | "danger";
    };
    /**
     * @description 表单类型，可选值 `button` `submit` `reset`
     */
    readonly formType: {
        type: PropType<"button" | "reset" | "submit">;
        default: "button" | "reset" | "submit";
    };
    /**
     * @description 尺寸，可选值为 `large` `small` `mini` `normal`
     */
    readonly size: {
        type: PropType<"normal" | "large" | "small" | "mini">;
        default: "normal" | "large" | "small" | "mini";
    };
    /**
     * @description 是否为块级元素
     */
    readonly block: BooleanConstructor;
    /**
     * @description 小程序开放能力
     */
    readonly openType: PropType<ButtonOpenType>;
    /**
     * @description 指定返回用户信息的语言，zh_CN 简体中文，zh_TW 繁体中文，en 英文
     */
    readonly lang: {
        type: PropType<ButtonLang>;
        default: ButtonLang;
    };
    /**
     * @description 会话来源，openType="contact"时有效
     */
    readonly sessionFrom: StringConstructor;
    /**
     * @description 会话内消息卡片标题，openType="contact"时有效
     */
    readonly sendMessageTitle: StringConstructor;
    /**
     * @description 会话内消息卡片点击跳转小程序路径，openType="contact"时有效
     */
    readonly sendMessagePath: StringConstructor;
    /**
     * @description 会话内消息卡片图片，openType="contact"时有效
     */
    readonly sendMessageImg: StringConstructor;
    /**
     * @description 是否显示会话内消息卡片，设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，openType="contact"时有效
     */
    readonly showMessageCard: BooleanConstructor;
    /**
     * @description 打开群资料卡时，传递的群号，openType="openGroupProfile"时有效
     */
    readonly groupId: StringConstructor;
    /**
     * @description 打开频道页面时，传递的频道号 openType="openGuildProfile"时有效
     */
    readonly guildId: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 打开公众号资料卡时，传递的号码 openType="openPublicProfile"时有效
     */
    readonly publicId: StringConstructor;
    /**
     * @description 客服的抖音号,openType="im"时有效
     */
    readonly dataImId: StringConstructor;
    /**
     * @description IM卡片类型,openType="im"时有效
     */
    readonly dataImType: StringConstructor;
    /**
     * @description 商品的id，仅支持泛知识课程库和生活服务商品库中的商品,openType="im"时有效
     */
    readonly dataGoodsId: StringConstructor;
    /**
     * @description 订单的id，仅支持交易2.0订单, openType="im"时有效
     */
    readonly dataOrderId: StringConstructor;
    /**
     * @description 商品类型，“1”代表生活服务，“2”代表泛知识。openType="im"时有效
     */
    readonly dataBizLine: StringConstructor;
    readonly customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    readonly customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type ButtonProps = ExtractPropTypes<typeof buttonProps>;
declare const buttonEmits: {
    click: (evt: MouseEvent) => boolean;
    getphonenumber: (evt: ButtonOnGetphonenumberEvent) => boolean;
    getuserinfo: (evt: any) => boolean;
    error: (evt: ButtonOnErrorEvent) => boolean;
    opensetting: (evt: ButtonOnOpensettingEvent) => boolean;
    launchapp: (evt: ButtonOnLaunchappEvent) => boolean;
    contact: (evt: any) => boolean;
    chooseavatar: (evt: ButtonOnChooseavatarEvent) => boolean;
    agreeprivacyauthorization: (evt: ButtonOnAgreeprivacyauthorizationEvent) => boolean;
    addgroupapp: (evt: ButtonOnAddgroupappEvent) => boolean;
    chooseaddress: (evt: ButtonOnChooseaddressEvent) => boolean;
    chooseinvoicetitle: (evt: ButtonOnChooseinvoicetitleEvent) => boolean;
    subscribe: (evt: ButtonOnSubscribeEvent) => boolean;
    login: (evt: ButtonOnLoginEvent) => boolean;
    im: (evt: any) => boolean;
};
type ButtonEmits = typeof buttonEmits;

declare const buttonType: readonly ["default", "primary", "info", "success", "warning", "danger"];
type ButtonType = (typeof buttonType)[number];
declare const buttonSize: readonly ["large", "normal", "small", "mini"];
type ButtonSize = (typeof buttonSize)[number];
declare const buttonShape: readonly ["square", "round"];
type ButtonShape = (typeof buttonShape)[number];
declare const buttonFormType: readonly ["button", "submit", "reset"];
type ButtonFormType = (typeof buttonFormType)[number];

declare const calendarProps: {
    /**
     * @description 是否可见
     */
    visible: BooleanConstructor;
    /**
     * @description 类型，日期单选 `one`，区间选择 `range`，日期多选 `multiple`，周选择 `week`
     */
    type: {
        type: PropType<"range" | "multiple" | "one" | "week">;
        default: "range" | "multiple" | "one" | "week";
    };
    /**
     * @description 是否弹窗状态展示
     */
    poppable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自动回填
     */
    isAutoBackFill: BooleanConstructor;
    /**
     * @description 显示标题
     */
    title: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 默认值，单个日期选择为 `string`，其他为 `string[]`
     */
    defaultValue: {
        type: PropType<string | string[]>;
    };
    /**
     * @description 开始日期
     */
    startDate: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 结束日期
     */
    endDate: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 范围选择，开始信息文案
     */
    startText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 范围选择，结束信息文案
     */
    endText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 底部确认按钮文案
     */
    confirmText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 是否展示今天标记
     */
    showToday: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否在展示日历标题
     */
    showTitle: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否展示日期标题
     */
    showSubTitle: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否启动滚动动画
     */
    toDateAnimation: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 设置周起始日
     */
    firstDayOfWeek: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 一个用来判断该日期是否被禁用的函数，接受一个 `年 - 月 - 日` 作为参数。 应该返回一个 Boolean 值。
     * @default undefined
     */
    disabledDate: FunctionConstructor;
    /**
     * @description 是否使用 footer 插槽，如果使用,此值必须为 true
     */
    footerSlot: BooleanConstructor;
    /**
     * @description 是否使用 btn 插槽，如果使用,此值必须为 true
     */
    btnSlot: BooleanConstructor;
    /**
     * @description 自定义弹窗样式
     */
    popStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
    /**
     * @description 遮罩显示时的背景是否锁定
     */
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
    position: {
        type: PropType<Position>;
        default: Position;
    };
    transition: {
        type: PropType<NutAnimationName>;
        default: string;
    };
    popClass: {
        type: PropType<string>;
        default: string;
    };
    round: BooleanConstructor;
    closeable: BooleanConstructor;
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    closeIconPosition: {
        type: PropType<"top-right" | "bottom-right" | "bottom-left" | "top-left">;
        default: "top-right" | "bottom-right" | "bottom-left" | "top-left";
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: true;
    };
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    safeAreaInsetBottom: BooleanConstructor;
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: true;
    };
    zIndex: NumberConstructor;
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    overlayStyle: PropType<vue.CSSProperties>;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
};
type CalendarProps = ExtractPropTypes<typeof calendarProps>;
declare const calendarEmits: {
    "update:visible": (value: boolean) => boolean;
    choose: (value: string | object) => boolean;
    select: (value: any) => boolean;
    clickCloseIcon: () => boolean;
    clickOverlay: () => boolean;
    open: () => boolean;
    opened: () => boolean;
    close: () => boolean;
    closed: () => boolean;
};
type CalendarEmits = typeof calendarEmits;

declare const calendaritemProps: {
    /**
     * @description 是否可见
     */
    visible: BooleanConstructor;
    /**
     * @description 类型，日期单选 `one`，区间选择 `range`，日期多选 `multiple`，周选择 `week`
     */
    type: {
        type: vue.PropType<"range" | "multiple" | "one" | "week">;
        default: "range" | "multiple" | "one" | "week";
    };
    /**
     * @description 是否弹窗状态展示
     */
    poppable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自动回填
     */
    isAutoBackFill: BooleanConstructor;
    /**
     * @description 显示标题
     */
    title: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 默认值，单个日期选择为 `string`，其他为 `string[]`
     */
    defaultValue: {
        type: (ArrayConstructor | StringConstructor)[];
    };
    /**
     * @description 开始日期
     */
    startDate: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 结束日期
     */
    endDate: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 范围选择，开始信息文案
     */
    startText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 范围选择，结束信息文案
     */
    endText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 底部确认按钮文案
     */
    confirmText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否展示今天标记
     */
    showToday: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否在展示日历标题
     */
    showTitle: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否展示日期标题
     */
    showSubTitle: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否启动滚动动画
     */
    toDateAnimation: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 设置周起始日
     */
    firstDayOfWeek: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 一个用来判断该日期是否被禁用的函数，接受一个 `年 - 月 - 日` 作为参数。 应该返回一个 Boolean 值。
     * @default undefined
     */
    disabledDate: FunctionConstructor;
    /**
     * @description 是否使用 footer 插槽，如果使用,此值必须为 true
     */
    footerSlot: BooleanConstructor;
    /**
     * @description 是否使用 btn 插槽，如果使用,此值必须为 true
     */
    btnSlot: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CalendarItemProps = ExtractPropTypes<typeof calendaritemProps>;
declare const calendaritemEmits: {
    choose: (value: string | object) => boolean;
    select: (value: any) => boolean;
    update: () => boolean;
    close: () => boolean;
};
type CalendarItemEmits = typeof calendaritemEmits;

declare const cardProps: {
    /**
     * @description 左侧图片 `Url`
     */
    imgUrl: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 标题
     */
    title: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 商品价格
     */
    price: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 会员价格
     */
    vipPrice: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 店铺介绍
     */
    shopDesc: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 配送方式
     */
    delivery: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 店铺名称
     */
    shopName: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否需要价格展示
     */
    isNeedPrice: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CardProps = ExtractPropTypes<typeof cardProps>;

interface CascaderOption {
    text?: string;
    value?: number | string;
    disabled?: boolean;
    children?: CascaderOption[];
    leaf?: boolean;
    level?: number;
    loading?: boolean;
    [key: PropertyKey]: any;
}
type CascaderValue = CascaderOption['value'][];

declare const cascaderProps: {
    /**
     * @description 选中值，双向绑定
     */
    modelValue: ArrayConstructor;
    /**
     * @description 显示选择层
     */
    visible: BooleanConstructor;
    /**
     * @description 级联数据
     */
    options: {
        type: PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否开启动态加载
     */
    lazy: BooleanConstructor;
    /**
     * @description 动态加载回调，开启动态加载时生效
     */
    lazyLoad: FunctionConstructor;
    /**
     * @description 自定义 `options` 结构中 `value` 的字段
     */
    valueKey: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自定义 `options` 结构中 `text` 的字段
     */
    textKey: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自定义 `options` 结构中 `children` 的字段
     */
    childrenKey: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 当 `options` 为可转换为树形结构的扁平结构时，配置转换规则
     */
    convertConfig: ObjectConstructor;
    /**
     * @description 是否需要弹层展示（设置为 `false` 后，`title` 失效）
     */
    poppable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 标题
     */
    title: StringConstructor;
    /**
     * @description 选中底部展示样式 可选值: 'line', 'smile'
     */
    titleType: {
        type: PropType<"line" | "card" | "smile">;
        default: "line" | "card" | "smile";
    };
    /**
     * @description 标签栏字体尺寸大小 可选值: 'large', 'normal', 'small'
     */
    titleSize: {
        type: PropType<"normal" | "large" | "small">;
        default: "normal" | "large" | "small";
    };
    /**
     * @description 标签间隙
     */
    titleGutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否省略过长的标题文字
     */
    titleEllipsis: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自定义弹窗样式
     */
    popStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
    /**
     * @description 遮罩显示时的背景是否锁定
     */
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
    position: {
        type: PropType<Position>;
        default: Position;
    };
    transition: {
        type: PropType<NutAnimationName>;
        default: string;
    };
    popClass: {
        type: PropType<string>;
        default: string;
    };
    round: BooleanConstructor;
    closeable: BooleanConstructor;
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    closeIconPosition: {
        type: PropType<"top-right" | "bottom-right" | "bottom-left" | "top-left">;
        default: "top-right" | "bottom-right" | "bottom-left" | "top-left";
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: true;
    };
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    safeAreaInsetBottom: BooleanConstructor;
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: true;
    };
    zIndex: NumberConstructor;
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    overlayStyle: PropType<vue.CSSProperties>;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
};
type CascaderProps = ExtractPropTypes<typeof cascaderProps>;
declare const cascaderEmits: {
    "update:modelValue": (value: CascaderValue) => boolean;
    "update:visible": (value: boolean) => boolean;
    change: (value: CascaderValue, nodes: CascaderOption[]) => boolean;
    pathChange: (nodes: CascaderOption[]) => boolean;
    open: () => boolean;
    opened: () => boolean;
    close: () => boolean;
    closed: () => boolean;
};
type CascaderEmits = typeof cascaderEmits;

declare const cascaderitemProps: {
    /**
     * @description 选中值，双向绑定
     */
    modelValue: ArrayConstructor;
    /**
     * @description 显示选择层
     */
    visible: BooleanConstructor;
    /**
     * @description 级联数据
     */
    options: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否开启动态加载
     */
    lazy: BooleanConstructor;
    /**
     * @description 动态加载回调，开启动态加载时生效
     */
    lazyLoad: FunctionConstructor;
    /**
     * @description 自定义 `options` 结构中 `value` 的字段
     */
    valueKey: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 自定义 `options` 结构中 `text` 的字段
     */
    textKey: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 自定义 `options` 结构中 `children` 的字段
     */
    childrenKey: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 当 `options` 为可转换为树形结构的扁平结构时，配置转换规则
     */
    convertConfig: ObjectConstructor;
    /**
     * @description 选中底部展示样式 可选值: 'line', 'smile'
     */
    titleType: {
        type: vue.PropType<"line" | "card" | "smile">;
        default: "line" | "card" | "smile";
    };
    /**
     * @description 标签栏字体尺寸大小 可选值: 'large', 'normal', 'small'
     */
    titleSize: {
        type: vue.PropType<"normal" | "large" | "small">;
        default: "normal" | "large" | "small";
    };
    /**
     * @description 标签间隙
     */
    titleGutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否省略过长的标题文字
     */
    titleEllipsis: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CascaderItemProps = ExtractPropTypes<typeof cascaderitemProps>;
declare const cascaderitemEmits: {
    "update:modelValue": (value: CascaderValue) => boolean;
    change: (value: CascaderValue, nodes: CascaderOption[]) => boolean;
    pathChange: (value: CascaderOption[]) => boolean;
};
type CascaderItemEmits = typeof cascaderitemEmits;

interface CategoryType {
    catName?: string;
    [key: string]: any;
}
declare const categoryProps: {
    /**
     * @description 分类模式：`classify`，`text`，`custom`
     */
    type: {
        type: vue.PropType<"text" | "custom" | "classify">;
        default: "text" | "custom" | "classify";
    };
    /**
     * @description 左侧导航栏数据列表
     */
    category: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CategoryProps = ExtractPropTypes<typeof categoryProps>;
declare const categoryEmits: {
    change: (index: number) => boolean;
};
type CategoryEmits = typeof categoryEmits;

interface ChildType {
    catName?: string;
    catType?: number;
    [key: string]: any;
}
interface CustomType {
    catName?: string;
    [key: string]: any;
}
declare const categorypaneProps: {
    /**
     * @description 分类模式：`classify`，`text`，`custom`
     */
    type: {
        type: vue.PropType<"text" | "custom" | "classify">;
        default: "text" | "custom" | "classify";
    };
    /**
     * @description 右侧展示当前分类数据
     */
    categoryChild: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 自定义分类数据
     */
    customCategory: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CategoryPaneProps = ExtractPropTypes<typeof categorypaneProps>;
declare const categorypaneEmits: {
    onChange: (sku: string | object) => boolean;
};
type CategoryPaneEmits = typeof categorypaneEmits;

declare const cellProps: {
    /**
     * @description 标题名称
     */
    title: StringConstructor;
    /**
     * @description 左侧副标题
     */
    subTitle: StringConstructor;
    /**
     * @description 右侧描述
     */
    desc: StringConstructor;
    /**
     * @description 右侧描述文本对齐方式 [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp)
     */
    descTextAlign: {
        type: vue.PropType<"left" | "right" | "inherit" | "center" | "justify">;
        default: "left" | "right" | "inherit" | "center" | "justify";
    };
    /**
     * @description 是否展示右侧箭头并开启点击反馈
     */
    isLink: BooleanConstructor;
    /**
     * @description 点击后跳转的目标路由对象，
     */
    to: StringConstructor;
    /**
     * @description 圆角半径
     */
    roundRadius: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    /**
     * @description 是否使内容垂直居中
     */
    center: BooleanConstructor;
    /**
     * @description 单元格大小，可选值为 `large`
     */
    size: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否启用点击效果
     */
    clickable: BooleanConstructor;
    /**
     * @description 左侧图标
     */
    icon: StringConstructor;
    /**
     * @description 标题宽度
     */
    titleWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: undefined;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CellProps = ExtractPropTypes<typeof cellProps>;
declare const cellEmits: {
    click: (event: Event) => boolean;
};
type CellEmits = typeof cellEmits;

declare const cellgroupProps: {
    /**
     * @description 标题名称
     */
    title: StringConstructor;
    /**
     * @description 右侧描述
     */
    desc: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CellGroupProps = ExtractPropTypes<typeof cellgroupProps>;

declare const checkboxProps: {
    /**
     * @description 是否处于选中状态
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 是否禁用选择
     */
    disabled: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 文本所在的位置，可选值：`left`,`right`
     */
    textPosition: {
        type: vue.PropType<"left" | "right">;
        default: "left" | "right";
    };
    /**
     * @description 图标大小，如 20px 2em 2rem
     */
    iconSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 复选框标识
     */
    label: (NumberConstructor | StringConstructor | BooleanConstructor)[];
    /**
     * @description 当前是否支持半选状态，一般用在全选操作中
     */
    indeterminate: BooleanConstructor;
    /**
     * @description 形状，可选值：`button`、`round`
     */
    shape: {
        type: vue.PropType<"button" | "round">;
        default: "button" | "round";
    };
    /**
     * @description 选中状态的值
     */
    checkedValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 未选中状态的值
     */
    uncheckedValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CheckboxProps = ExtractPropTypes<typeof checkboxProps>;
declare const checkboxEmits: {
    "update:modelValue": (value: any) => boolean;
    change: (checked: boolean, value: any) => boolean;
};
type CheckboxEmits = typeof checkboxEmits;
declare const CHECKBOX_KEY: unique symbol;

declare const checkboxgroupProps: {
    /**
     * @description 当前选中项的标识符，和 `label` 相对应
     */
    modelValue: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否禁用选择,将用于其下的全部复选框
     */
    disabled: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 限制选择的数量，不能和全选/取消/反选一起使用, 0表示没有限制
     */
    max: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CheckboxGroupProps = ExtractPropTypes<typeof checkboxgroupProps>;
declare const checkboxgroupEmits: {
    "update:modelValue": (value: any[]) => boolean;
    change: (value: any[]) => boolean;
};
type CheckboxGroupEmits = typeof checkboxgroupEmits;

interface CheckboxGroupInst {
    /**
     * @description 全选/取消 传 true,表示全选，传 false,表示取消全选
     */
    toggleAll: (checked: boolean) => void;
    /**
     * @description 反选
     */
    toggleReverse: () => void;
}
/**
 * @deprecated
 */
type CheckBoxInst = CheckboxGroupInst;

declare const circleprogressProps: {
    /**
     * @description 进度百分比
     */
    progress: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 圆弧的宽度
     */
    strokeWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 半径
     */
    radius: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 圆环进度条端点形状，可选值为 `square`、`round`、`butt`
     */
    strokeLinecap: {
        type: vue.PropType<"round" | "butt" | "square">;
        default: "round" | "butt" | "square";
    };
    /**
     * @description 圆环进度条颜色
     */
    customColor: {
        type: (ObjectConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 圆环轨道颜色
     */
    pathColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否顺时针展示
     */
    clockwise: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CircleProgressProps = ExtractPropTypes<typeof circleprogressProps>;

declare const codeinputProps: {
    /**
     * @description 键盘弹起时，是否自动上推页面
     */
    adjustPosition: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 最大输入长度
     */
    maxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否用圆点填充
     */
    dot: BooleanConstructor;
    /**
     * @description 显示模式，可选值：`box`-盒子模式，`line`-底部横线模式
     */
    mode: {
        type: vue.PropType<"line" | "box">;
        default: "line" | "box";
    };
    /**
     * @description 是否细边框
     */
    hairline: BooleanConstructor;
    /**
     * @description 字符间的距离
     */
    space: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 预置值
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 是否自动获取焦点
     */
    focus: BooleanConstructor;
    /**
     * @description 字体是否加粗
     */
    bold: BooleanConstructor;
    /**
     * @description 字体颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 字体大小
     */
    fontSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 输入框的大小，宽等于高
     */
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否隐藏原生键盘，如果想用自定义键盘的话，需设置此参数为true
     */
    disabledKeyboard: BooleanConstructor;
    /**
     * @description 边框和线条颜色
     */
    borderColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否禁止输入"."符号
     */
    disabledDot: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CodeInputProps = ExtractPropTypes<typeof codeinputProps>;
declare const codeinputEmits: {
    change: (val: string) => boolean;
    input: (val: string) => boolean;
    finish: (val: string) => boolean;
    "update:modelValue": (val: number | string) => boolean;
};
type CodeInputEmits = typeof codeinputEmits;

declare const colProps: {
    /**
     * @description 列元素宽度（共分为 24 份，例如设置一行3个，那么 `span` 值为 8）
     */
    span: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 列元素偏移距离
     */
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ColProps = ExtractPropTypes<typeof colProps>;

declare const collapseProps: {
    /**
     * @description 当前展开面板的 `name`
     */
    modelValue: {
        type: PropType<string | number | (string | number)[]>;
    };
    /**
     * @description 是否开启手风琴模式
     */
    accordion: BooleanConstructor;
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type CollapseProps = ExtractPropTypes<typeof collapseProps>;
declare const collapseEmits: {
    change: (val: string | number | (string | number)[], name: string | number, status: boolean) => boolean;
    "update:modelValue": (val: string | number | (string | number)[]) => boolean;
};
type CollapseEmits = typeof collapseEmits;

declare const collapseitemProps: {
    /**
     * @description 折叠面板的引用对象
     */
    collapseRef: ObjectConstructor;
    /**
     * @description 标题栏左侧内容，支持插槽传入（`props` 传入的优先级更高）
     */
    title: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 唯一标识符，必填
     */
    name: {
        default: number;
        type: PropType<string | number>;
        required: true;
    };
    /**
     * @description 标题栏右侧内容，支持插槽传入（`props` 传入的优先级更高）
     */
    value: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 标题栏描述信息
     */
    label: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 标题栏是否禁用
     */
    disabled: BooleanConstructor;
    /**
     * @description 是否显示边框
     * @type boolean
     * @default true
     */
    border: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 标题栏左侧图标组件，等同于 `nutui-icon` 组件
     */
    icon: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 点击折叠和展开的旋转角度，在自定义图标模式下生效
     */
    rotate: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type CollapseItemProps = ExtractPropTypes<typeof collapseitemProps>;

interface VideosType {
    id: number | string;
    mainUrl: string;
    videoUrl: string;
}
interface ImagesType {
    smallImgUrl: string;
    bigImgUrl: string;
    imgUrl: string;
}
interface InfoType {
    /**
     * @description 评论详情
     */
    content: string;
    /**
     * @description 评论人的姓名
     */
    nickName: string;
    /**
     * @description 评论星星数
     */
    score: string | number;
    /**
     * @description 评论人头像
     */
    avatar: string;
    /**
     * @description 评论时间
     */
    time: string;
    /**
     * @description 评论人购买的商品规格
     */
    size: string;
    /**
     * @description 此评论的回复数
     */
    replay: number;
    /**
     * @description 此评论的点赞数
     */
    like: number;
}
interface FollowType {
    /**
     * @description 购买多少天后进行追评
     */
    days: number;
    /**
     * @description 追评内容
     */
    content: string;
    /**
     * @description 追评图片
     */
    images: [];
}

declare const commentProps: {
    /**
     * @description 头部样式展示类型，可选： `default`，`complex`
     */
    headerType: {
        type: vue.PropType<"default" | "complex">;
        default: "default" | "complex";
    };
    /**
     * @description 评论图片展示行数，可选： `one`，`multi`
     */
    imagesRows: {
        type: vue.PropType<"one" | "multi">;
        default: "one" | "multi";
    };
    /**
     * @description 设置评论内容省略行数
     */
    ellipsis: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 视频信息
     */
    videos: {
        type: vue.PropType<VideosType[]>;
        default: () => VideosType[];
    };
    /**
     * @description 图片信息
     */
    images: {
        type: vue.PropType<ImagesType[]>;
        default: () => ImagesType[];
    };
    /**
     * @description 评论详情
     */
    info: {
        type: vue.PropType<InfoType>;
        default: () => InfoType;
    };
    /**
     * @description
     */
    labels: {
        type: FunctionConstructor;
        default: () => string;
    };
    /**
     * @description 追评内容
     */
    follow: {
        type: vue.PropType<FollowType>;
        default: () => FollowType;
    };
    /**
     * @description 配置底部按钮
     */
    operation: {
        type: vue.PropType<("replay" | "like" | "more")[]>;
        default: () => ("replay" | "like" | "more")[];
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CommentProps = ExtractPropTypes<typeof commentProps>;
declare const commentEmits: {
    click: (val: object) => boolean;
    clickOperate: (val: string) => boolean;
    clickImages: (val: any) => boolean;
};
type CommentEmits = typeof commentEmits;

declare const configProviderProps: {
    /**
     * @description 主题风格，设置为 `dark` 来开启深色模式，全局生效
     */
    theme: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 自定义主题变量
     */
    themeVars: {
        type: ObjectConstructor;
        default: {};
    };
    /**
     * @description 设置所有弹窗类组件的 z-index，该属性对全局生效
     */
    zIndex: NumberConstructor;
};
type ConfigProviderProps = ExtractPropTypes<typeof configProviderProps>;

declare const countdownProps: {
    /**
     * @description 当前时间，自定义展示内容时生效
     */
    modelValue: {
        type: vue.PropType<{}>;
        default: () => {};
    };
    /**
     * @description 开始时间
     */
    startTime: {
        type: (NumberConstructor | StringConstructor)[];
        validator(v: Date): boolean;
    };
    /**
     * @description 结束时间
     */
    endTime: {
        type: (NumberConstructor | StringConstructor)[];
        validator(v: Date): boolean;
    };
    /**
     * @description 是否开启毫秒级渲染
     */
    millisecond: BooleanConstructor;
    /**
     * @description 时间格式
     */
    format: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否自动开始倒计时
     */
    autoStart: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 倒计时显示时间，单位是毫秒。`auto-start` 为 `false` 时生效
     */
    time: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否暂停
     */
    paused: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
declare const countdownEmits: {
    input: (val: string | {
        d: number;
        h: number;
        m: number;
        s: number;
        ms: number;
    }) => boolean;
    "update:modelValue": (val: string | {
        d: number;
        h: number;
        m: number;
        s: number;
        ms: number;
    }) => boolean;
    onEnd: () => boolean;
    onRestart: (val: number) => boolean;
    onPaused: (val: number) => boolean;
};
type CountdownEmits = typeof countdownEmits;
interface CountdownInst {
    /**
     * @description 开始倒计时
     */
    start: () => void;
    /**
     * @description 暂停倒计时
     */
    pause: () => void;
    /**
     * @description 重设倒计时，若 `auto-start` 为 `true`，重设后会自动开始倒计时
     */
    reset: () => void;
}
type CountDownPropsProps = ExtractPropTypes<typeof countdownProps>;

declare const countupProps: {
    /**
     * @description 初始数字
     */
    initNum: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 结束数字
     */
    endNum: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 间隔数字，目前仅支持基础用法
     */
    speed: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 保留小数点后几位
     */
    toFixed: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 触发数字滚动的标识
     */
    startFlag: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 滚动一次运行时间
     */
    during: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 数字宽度，常用于自定义无缝滚动
     */
    numWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 数字高度，常用于自定义无缝滚动（抽奖功能必传）
     */
    numHeight: {
        type: NumberConstructor;
        default: number;
    };
    scrolling: BooleanConstructor;
    /**
     * @description 要变化的数字（用于自定义图片，`initNum`、`endNum` 在此无效）
     */
    customChangeNum: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 自定义图片（建议使用雪碧图实现，使用抽奖功能必须使用雪碧图）
     */
    customBgImg: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 图片中数字之间可能会存在间距
     */
    customSpacNum: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 抽奖功能传 machine，可选值为 `machine` `' '`
     */
    type: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 奖品个数，一共多少个奖品，必传
     */
    machinePrizeNum: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 抽奖位，即滚动几个，必传
     */
    machineNum: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 中奖图标，图标在雪碧图中的位置
     */
    machinePrizeLevel: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 滚动圈数
     */
    machineTurnMore: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type CountUpProps = ExtractPropTypes<typeof countupProps>;
declare const countupEmits: {
    scrollEnd: (val?: boolean) => boolean;
};
type CountUpEmits = typeof countupEmits;
interface IData {
    valFlag: boolean;
    current: number;
    sortFlag: string;
    initDigit1: number;
    initDigit2: number;
    to0_10: number[];
    to10_0: Array<number>;
    timer: null | any;
    totalCount: number;
    pointNum: number;
    numberVal: number;
    num_total_len: number;
    relNum: number;
    customNumber: number;
    prizeLevelTrun: number;
    prizeY: Array<any>;
    prizeYPrev: Array<any>;
    finshMachine: number;
    notPrize: Array<any>;
    typeMachine: string;
}
interface CountUpInst {
    /**
     * @description 抽奖
     */
    machineLuck: () => void;
}

interface PickerOption {
    text?: string | number;
    value?: string | number;
    disabled?: string;
    children?: PickerOption[];
    className?: string | number;
    [key: PropertyKey]: any;
}
interface PickerTouchParams {
    startY: number;
    endY: number;
    startTime: number;
    endTime: number;
    lastY: number;
    lastTime: number;
}
interface PickerFieldNames {
    text?: string;
    value?: string;
    children?: string;
    className?: string;
}

declare const pickercolumnProps: {
    /**
     * @description 当前选中项
     */
    value: (NumberConstructor | StringConstructor)[];
    /**
     * @description 显示的数据
     */
    column: {
        type: PropType<PickerOption[]>;
        default: () => PickerOption[];
    };
    /**
     * @description 是否开启3D效果
     */
    threeDimensional: BooleanConstructor;
    /**
     * @description 惯性滚动时长
     */
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 可见的选项个数
     */
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 选项高度
     */
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 自定义 columns 中的字段
     */
    fieldNames: {
        type: PropType<Required<PickerFieldNames>>;
        default: () => {};
    };
    /**
     * @description 特殊环境判断
     */
    uni: BooleanConstructor;
};
type PickerColumnProps = ExtractPropTypes<typeof pickercolumnProps>;
declare const pickercolumnEmits: {
    change: (val: PickerOption) => val is any[] | PickerOption;
};
type PickerColumnEmits = typeof pickercolumnEmits;

interface PickerBaseEvent {
    selectedValue: (string | number)[];
    selectedOptions: PickerOption[];
}
interface PickerChangeEvent extends PickerBaseEvent {
    columnIndex: number;
}
declare const pickerColumnsType: readonly ["single", "multiple", "cascade"];
type PickerColumnsType = (typeof pickerColumnsType)[number];

declare const pickerProps: {
    /**
     * @description 默认选中项
     */
    modelValue: {
        type: vue.PropType<(string | number)[]>;
        default: () => (string | number)[];
    };
    /**
     * @description 对象数组，配置每一列显示的数据
     */
    columns: {
        type: vue.PropType<(PickerOption | PickerOption[])[]>;
        default: () => (PickerOption | PickerOption[])[];
    };
    /**
     * @description 是否显示顶部导航
     */
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 设置标题
     */
    title: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 确定按钮文案
     */
    okText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 取消按钮文案
     */
    cancelText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否开启3D效果
     */
    threeDimensional: BooleanConstructor;
    /**
     * @description 惯性滚动时长
     */
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 可见的选项个数
     */
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 选项高度
     */
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 自定义 columns 中的字段
     */
    fieldNames: {
        type: vue.PropType<PickerFieldNames>;
        default: () => PickerFieldNames;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type PickerProps = ExtractPropTypes<typeof pickerProps>;
declare const pickerEmits: {
    "update:modelValue": (val: (string | number)[]) => boolean;
    change: (evt: PickerChangeEvent) => boolean;
    confirm: (evt: PickerBaseEvent) => boolean;
    cancel: (evt: PickerBaseEvent) => boolean;
};
type PickerEmits = typeof pickerEmits;

type DateLike = number | string | Date;
declare const datepickerType: readonly ["date", "time", "year-month", "month-day", "datehour", "hour-minute", "datetime"];
type DatePickerType = (typeof datepickerType)[number];
declare const datepickerColumnType: readonly ["year", "month", "day", "hour", "minute", "seconds"];
type DatePickerColumnType = (typeof datepickerColumnType)[number];
interface DatePickerBaseEvent extends PickerBaseEvent {
    date: Date;
}
interface DatePickerChangeEvent extends DatePickerBaseEvent, PickerChangeEvent {
}
type DatePickerFormatter = (type: DatePickerColumnType, option: PickerOption) => PickerOption;
type DatePickerFilter = (type: DatePickerColumnType, options: PickerOption[]) => PickerOption[];
interface DatePickerRangeItem {
    type: DatePickerColumnType;
    range: [number, number];
}

declare const datepickerProps: {
    /**
     * @description 初始值
     */
    modelValue: {
        type: PropType<DateLike>;
    };
    /**
     * @description 时间类型，可选值 `date`(年月日) `time`(时分秒) `year-month`(年月) `month-day`(月日) `datehour`(年月日时) `hour-minute`
     */
    type: {
        type: PropType<"date" | "time" | "year-month" | "month-day" | "datehour" | "hour-minute" | "datetime">;
        default: "date" | "time" | "year-month" | "month-day" | "datehour" | "hour-minute" | "datetime";
    };
    /**
     * @description 是否显示顶部导航
     */
    showToolbar: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 设置标题
     */
    title: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 确定按钮文案
     */
    okText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 取消按钮文案
     */
    cancelText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 每列是否展示中文
     */
    isShowChinese: BooleanConstructor;
    /**
     * @description 分钟步进值
     */
    minuteStep: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 开始日期
     */
    minDate: {
        type: PropType<DateLike>;
        default: () => Date;
    };
    /**
     * @description 结束日期
     */
    maxDate: {
        type: PropType<DateLike>;
        default: () => Date;
    };
    /**
     * @description 选项格式化函数
     */
    formatter: PropType<DatePickerFormatter>;
    /**
     * @description 选项过滤函数
     */
    filter: PropType<DatePickerFilter>;
    /**
     * @description 是否开启3D效果
     */
    threeDimensional: BooleanConstructor;
    /**
     * @description 惯性滚动时长
     */
    swipeDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 可见的选项个数
     */
    visibleOptionNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 选项高度
     */
    optionHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
};
type DatePickerProps = ExtractPropTypes<typeof datepickerProps>;
declare const datepickerEmits: {
    "update:modelValue": (val: Date) => boolean;
    change: (evt: DatePickerChangeEvent) => boolean;
    confirm: (evt: DatePickerBaseEvent) => boolean;
    cancel: (evt: DatePickerBaseEvent) => boolean;
};
type DatePickerEmits = typeof datepickerEmits;

declare const dialogProps: {
    /**
     * @description 点击蒙层是否关闭对话框
     */
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 标题
     */
    title: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 内容，支持 HTML
     */
    content: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 是否隐藏底部按钮栏
     */
    noFooter: BooleanConstructor;
    /**
     * @description 是否隐藏确定按钮
     */
    noOkBtn: BooleanConstructor;
    /**
     * @description 是否隐藏取消按钮
     */
    noCancelBtn: BooleanConstructor;
    /**
     * @description 取消按钮文案
     */
    cancelText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 确定按钮文案
     */
    okText: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 确认按钮是否默认关闭弹窗
     */
    okAutoClose: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 取消按钮是否默认关闭弹窗
     */
    cancelAutoClose: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 文字对齐方向，可选值同 css 的 text-align
     */
    textAlign: {
        type: PropType<"left" | "right" | "center" | "top">;
        default: "left" | "right" | "center" | "top";
    };
    /**
     * @description 是否在页面回退时自动关闭
     */
    closeOnPopstate: BooleanConstructor;
    /**
     * @description 使用横纵方向,可选值`horizontal`、`vertical`
     */
    footerDirection: {
        type: PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    /**
     * @description 自定义类名
     */
    customClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自定义 popup 弹框样式
     */
    popStyle: {
        type: PropType<CSSProperties>;
    };
    /**
     * @description 是否在页面回退时自动关闭
     */
    beforeClose: PropType<Interceptor>;
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
    position: {
        type: PropType<Position>;
        default: Position;
    };
    transition: {
        type: PropType<NutAnimationName>;
        default: string;
    };
    popClass: {
        type: PropType<string>;
        default: string;
    };
    round: BooleanConstructor;
    closeable: BooleanConstructor;
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    closeIconPosition: {
        type: PropType<"top-right" | "bottom-right" | "bottom-left" | "top-left">;
        default: "top-right" | "bottom-right" | "bottom-left" | "top-left";
    };
    destroyOnClose: {
        type: BooleanConstructor;
        default: true;
    };
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    safeAreaInsetBottom: BooleanConstructor;
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: true;
    };
    visible: BooleanConstructor;
    zIndex: NumberConstructor;
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    overlayStyle: PropType<CSSProperties>;
    lockScroll: BooleanConstructor;
};
type DialogProps = ExtractPropTypes<typeof dialogProps>;
declare const dialogEmits: {
    update: (val: boolean) => boolean;
    "update:visible": (val: boolean) => boolean;
    ok: () => boolean;
    cancel: () => boolean;
    opened: () => boolean;
    closed: () => boolean;
};
type DialogEmits = typeof dialogEmits;

declare const textAlign: readonly ["left", "center", "right", "top"];
type TextAlign = (typeof textAlign)[number];
declare const footerDirection: readonly ["horizontal", "vertical"];
type FooterDirection = (typeof footerDirection)[number];
interface DialogOptions {
    /**
     * @description 标题
     */
    title?: string;
    /**
     * @description 内容，支持 HTML
     */
    content?: string;
    /**
     * @description 是否隐藏底部按钮栏
     */
    noFooter?: boolean;
    /**
     * @description 是否隐藏确定按钮
     */
    noOkBtn?: boolean;
    /**
     * @description 是否隐藏取消按钮
     */
    noCancelBtn?: boolean;
    /**
     * @description 取消按钮文案
     */
    cancelText?: string;
    /**
     * @description 确定按钮文案
     */
    okText?: string;
    /**
     * @description 文字对齐方向，可选值同 css 的 text-align
     */
    textAlign?: TextAlign;
    /**
     * @description 使用横纵方向 可选值 horizontal、vertical
     */
    footerDirection?: FooterDirection;
    /**
     * @description 弹出动画类型
     */
    transition?: NutAnimationName;
    /**
     * @description 点击蒙层是否关闭对话框
     */
    closeOnClickOverlay?: boolean;
    /**
     * @description 确认按钮是否默认关闭弹窗
     */
    okAutoClose?: boolean;
}
interface DialogInst {
    /**
     * @description 弹出对话框
     */
    showDialog: (options: DialogOptions) => void;
    /**
     * @description 点击确定
     */
    onOk: () => void;
    /**
     * @description 点击取消
     */
    onCancel: () => void;
}

declare function useDialog(props: DialogProps, emit: SetupContext<DialogEmits>['emit']): {
    contentStyle: vue.ComputedRef<CSSProperties>;
    showPopup: vue.Ref<boolean>;
    onClickOverlay: () => void;
    onCancel: () => void;
    onOk: () => void;
    closed: (action?: string) => void;
    classes: vue.ComputedRef<string>;
    showDialog: (options: DialogOptions) => void;
    dialogStatus: vue.Ref<{
        title?: string | undefined;
        content?: string | undefined;
        noFooter?: boolean | undefined;
        noOkBtn?: boolean | undefined;
        noCancelBtn?: boolean | undefined;
        cancelText?: string | undefined;
        okText?: string | undefined;
        textAlign?: TextAlign | undefined;
        footerDirection?: FooterDirection | undefined;
        transition?: NutAnimationName | undefined;
        closeOnClickOverlay?: boolean | undefined;
        okAutoClose?: boolean | undefined;
    }>;
};

declare const dividerProps: {
    /**
     * @description 内容位置，可选值为 `left`、`right`、`center`
     */
    contentPosition: {
        type: vue.PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 是否使用虚线
     */
    dashed: BooleanConstructor;
    /**
     * @description 是否使用 `0.5px` 线
     */
    hairline: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 水平还是垂直类型，可选值 `vertical`和`horizontal`
     */
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type DividerProps = ExtractPropTypes<typeof dividerProps>;

declare const dollmachineProps: {
    /**
     * @description 初始化爪子的图片链接
     */
    defaultClaw: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 爪子抓到奖品的图片链接
     */
    activeClaw: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 速度
     */
    speed: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 奖品列表
     */
    prizeList: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 中奖奖品在列表的索引位置
     */
    prizeIndex: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type DollMachineProps = ExtractPropTypes<typeof dollmachineProps>;
declare const dollmachineEmits: {
    click: () => boolean;
    startTurns: () => boolean;
    endTurns: () => boolean;
};
type DollMachineEmits = typeof dollmachineEmits;

declare const dragProps: {
    /**
     * @description 是否开启自动吸边（根据 screenWidth 进行吸边）
     */
    attract: BooleanConstructor;
    /**
     * @description 拖拽元素的拖拽方向限制，'x'/'y'/'all'三选一
     */
    direction: {
        type: vue.PropType<"all" | "x" | "y">;
        default: "all" | "x" | "y";
    };
    /**
     * @description 拖拽元素的拖拽边界
     */
    boundary: {
        type: ObjectConstructor;
        default: () => {
            top: number;
            left: number;
            right: number;
            bottom: number;
        };
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type DragProps = ExtractPropTypes<typeof dragProps>;

type EcardDataValue = number | string;
interface EcardDataItem {
    price: EcardDataValue;
}
interface EcardChangeEvent {
    price: EcardDataValue;
}
interface EcardUpdateOptions {
    /**
     * 选中项（从0开始的索引，-1表示选中输入框，null表示不选中）
     */
    index?: number | null;
    /**
     * 其他面值（当index为-1或null时有效）
     */
    input?: string;
    /**
     * 数量
     */
    count?: number;
}
interface EcardInst {
    /**
     * 更新面值
     *
     * @param options 配置项
     */
    update: (options: EcardUpdateOptions) => void;
}

declare const ecardProps: {
    /**
     * @description 购买电子卡所需价钱
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 电子卡面值列表
     */
    list: {
        type: vue.PropType<EcardDataItem[]>;
        default: () => EcardDataItem[];
    };
    /**
     * @description 选择面值文案
     */
    chooseText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否显示其他面值
     */
    showOther: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 其他面值文案
     */
    otherValueText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 其他面值默认提示语
     */
    placeholder: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 符号标示
     */
    suffix: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 其它面值最小值
     */
    cardAmountMin: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 其他面值最大值
     */
    cardAmountMax: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否显示步进
     */
    showStep: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 购买数量最小值
     */
    cardBuyMin: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 购买数量最大值
     */
    cardBuyMax: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ECardProps = ExtractPropTypes<typeof ecardProps>;
declare const ecardEmits: {
    "update:modelValue": (val: EcardDataValue) => val is string | number;
    update: (val: EcardDataValue) => val is string | number;
    change: (evt: EcardChangeEvent) => boolean;
    inputChange: (val: string) => boolean;
    changeStep: (val1: number, val2: EcardDataValue) => boolean;
    inputClick: () => boolean;
};
type ECardEmits = typeof ecardEmits;

interface ElevatorData {
    name?: string;
    id?: number | string;
    [key: string]: any;
}
interface ElevatorInst {
    scrollTo: (val: number) => void;
}

declare const elevatorProps: {
    /**
     * @description 电梯区域的高度
     */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 索引 key 值
     */
    acceptKey: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 索引列表
     */
    indexList: {
        type: vue.PropType<ElevatorData[]>;
        default: () => ElevatorData[];
    };
    /**
     * @description 索引是否吸顶
     */
    isSticky: BooleanConstructor;
    /**
     * @description 右侧锚点的上下间距
     */
    spaceHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 左侧索引的高度
     */
    titleHeight: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ElevatorProps = ExtractPropTypes<typeof elevatorProps>;
declare const elevatorEmits: {
    clickItem: (key: string, item: any) => boolean;
    clickIndex: (key: string) => boolean;
    change: (val: number) => boolean;
};
type ElevatorEmits = typeof elevatorEmits;

interface EllipsisedValue {
    leading?: string;
    tailing?: string;
}
declare const ellipsisProps: {
    /**
     * @description 文本内容
     */
    content: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 省略位置，可选值 `start` \| `end` \| `middle`
     */
    direction: {
        type: vue.PropType<"end" | "start" | "middle">;
        default: "end" | "start" | "middle";
    };
    /**
     * @description 展示几行
     */
    rows: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 展开操作的文案
     */
    expandText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 收起操作的文案
     */
    collapseText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 省略的符号
     */
    symbol: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 容器的行高
     */
    lineHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type EllipsisProps = ExtractPropTypes<typeof ellipsisProps>;
declare const ellipsisEmits: {
    change: (val: "expand" | "collapse") => "collapse" | "expand";
    click: () => boolean;
};
type EllipsisEmits = typeof ellipsisEmits;

declare const emptyProps: {
    /**
     * @description 图片类型，可选值为 `empty`、`error`、`network`，支持传入图片 `URL`
     */
    image: {
        type: vue.PropType<(string & {}) | "error" | "empty" | "network">;
        default: (string & {}) | "error" | "empty" | "network";
    };
    /**
     * @description 图片大小，单位为 `px`
     */
    imageSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 图片下方的描述文字
     */
    description: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type EmptyProps = ExtractPropTypes<typeof emptyProps>;

declare const fixednavProps: {
    /**
     * @description 是否打开
     */
    visible: BooleanConstructor;
    /**
     * @description 悬浮列表内容数据
     */
    navList: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 选中按钮文案颜色
     */
    activeColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 收起列表按钮文案
     */
    activeText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 展开列表按钮文案
     */
    unActiveText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 导航方向，可选值 'left'、'right'
     */
    type: {
        type: vue.PropType<"left" | "right">;
        default: "left" | "right";
    };
    /**
     * @description 展开时是否显示遮罩
     */
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description fixed 垂直位置
     */
    position: {
        default: () => {
            top: string;
            bottom: string;
        };
        type: ObjectConstructor;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type FixednavProps = ExtractPropTypes<typeof fixednavProps>;
declare const fixednavEmits: {
    "update:visible": (val: boolean) => boolean;
    selected: (val: {
        item: any;
        event: Event;
    }) => boolean;
};
type FixednavEmits = typeof fixednavEmits;

declare class FormItemRuleWithoutValidator {
    regex?: RegExp;
    required?: boolean;
    message: string;
    [key: string]: any;
}
interface FormItemRule extends FormItemRuleWithoutValidator {
    validator?: (value: any, ruleCfg: FormItemRuleWithoutValidator) => boolean | Promise<string> | Promise<boolean> | Promise<void> | Promise<unknown>;
}
type FormItemLabelPosition = 'left' | 'right' | 'top';
type FormItemStarPosition = 'left' | 'right';

interface FormRules {
    [key: string]: FormItemRule[];
}
interface FormRule {
    prop: string;
    rules: FormItemRule[];
}
interface ErrorMessage {
    prop: string;
    message: string;
}
interface FormInst {
    /**
     * @description 清空校验结果
     */
    reset: () => void;
    /**
     * @description 提交表单进行校验的方法
     */
    submit: () => void;
    /**
     * @description 用户主动触发校验，用于用户自定义场景时触发，例如 `blur`、`change` 事件 | 同 `FormItem prop` 值,不传值会校验全部 `Rule`
     */
    validate: (customProp?: any) => Promise<{
        valid: boolean;
        errors: ErrorMessage[];
    }>;
}
type FormLabelPosition = FormItemLabelPosition;
type FormStarPosition = FormItemStarPosition;

declare const FORM_KEY: unique symbol;
declare const formProps: {
    /**
     * @description 表单数据对象(使用表单校验时，_必填_)
     */
    modelValue: {
        type: vue.PropType<{}>;
        default: () => {};
    };
    /**
     * @description 统一配置每个 `FormItem` 的 `rules`
     */
    rules: {
        type: vue.PropType<FormRules>;
        default: () => FormRules;
    };
    /**
     * @description 禁用表单下的所有数据录入组件
     */
    disabled: BooleanConstructor;
    /**
     * @description 表单项 label 的位置
     */
    labelPosition: {
        type: vue.PropType<FormItemLabelPosition>;
        default: FormItemLabelPosition;
    };
    /**
     * @description 必填表单项 label 的红色星标位置
     */
    starPosition: {
        type: vue.PropType<FormItemStarPosition>;
        default: FormItemStarPosition;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type FormProps = ExtractPropTypes<typeof formProps>;
declare const formEmits: {
    validate: (msg: ErrorMessage) => boolean;
};
type FormEmits = typeof formEmits;
declare function useFormDisabled(disabled: Ref<boolean | undefined>): vue.ComputedRef<boolean>;

declare const formitemProps: {
    /**
     * @description 是否显示必填字段的标签旁边的红色星号
     */
    required: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 表单域 `v-model` 字段，在使用表单校验功能的情况下，该属性是必填的
     */
    prop: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description
     */
    label: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 定义校验规则
     */
    rules: {
        type: vue.PropType<FormItemRule[]>;
        default: () => FormItemRule[];
    };
    /**
     * @description 表单项 `label` 宽度，默认单位为 `px`
     */
    labelWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 表单项 `label` 对齐方式，可选值为 `center`、`right`
     */
    labelAlign: {
        type: vue.PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 右侧插槽对齐方式，可选值为 `center`、`right`
     */
    bodyAlign: {
        type: vue.PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 错误提示文案对齐方式，可选值为 `center`、`right`
     */
    errorMessageAlign: {
        type: vue.PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 是否在校验不通过时标红输入框
     */
    showErrorLine: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否在校验不通过时在输入框下方展示错误提示
     * @type {boolean}
     * @default true
     */
    showErrorMessage: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 表单项 label 的位置，优先级高于 form 中的 `label-position`
     */
    labelPosition: {
        type: vue.PropType<FormItemLabelPosition | undefined>;
        default: FormItemLabelPosition | undefined;
    };
    /**
     * @description 必填表单项 label 的红色星标位置，优先级高于 form 中的 `star-position`
     */
    starPosition: {
        type: vue.PropType<FormItemStarPosition | undefined>;
        default: FormItemStarPosition | undefined;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type FormItemProps = ExtractPropTypes<typeof formitemProps>;

declare const giftboxEmits: {
    startTurns: () => boolean;
    endTurns: () => boolean;
};
type GiftBoxEmits = typeof giftboxEmits;
interface GiftBoxInst {
    /**
     * @description 礼盒初始化
     */
    init: () => void;
}

declare const GRID_KEY: unique symbol;
declare const gridProps: {
    /**
     * @description 列数
     */
    columnNum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否显示边框
     */
    border: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 格子之间的间距，默认单位为 `px`
     */
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否将格子内容居中显示
     */
    center: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否将格子固定为正方形
     */
    square: BooleanConstructor;
    /**
     * @description 内容翻转
     */
    reverse: BooleanConstructor;
    /**
     * @description 格子内容排列的方向，可选值为 `horizontal`
     */
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    /**
     * @description 是否开启格子点击反馈
     */
    clickable: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type GridProps = ExtractPropTypes<typeof gridProps>;

declare const gridItemProps: {
    /**
     * @description 文字
     */
    text: StringConstructor;
    /**
     * @description 点击后跳转的目标路由对象，同 vue-router 的 to 属性
     */
    to: (ObjectConstructor | StringConstructor)[];
    /**
     * @description 点击后跳转的链接地址
     */
    url: StringConstructor;
    /**
     * @description 是否在跳转时替换当前页面历史
     */
    replace: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type GridItemProps = ExtractPropTypes<typeof gridItemProps>;
declare const gridItemEmits: {
    click: (evt: MouseEvent) => boolean;
};
type GridItemEmits = typeof gridItemEmits;

declare const hiteggsProps: {
    /**
     * @description 金蛋个数
     */
    num: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 完整金蛋图片地址
     */
    intactImg: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 锤子图片
     */
    hammer: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description
     */
    splitImg: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 金蛋图片宽度
     */
    width: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 金蛋图片高度
     */
    height: {
        type: StringConstructor;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type HitEggsProps = ExtractPropTypes<typeof hiteggsProps>;
declare const hiteggsEmits: {
    click: () => boolean;
};
type HitEggsEmits = typeof hiteggsEmits;

declare const iconProps: {
    popClass: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 图标宽度
     */
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 图标高度
     */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 图标名称
     */
    name: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 图标大小
     */
    size: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 自定义 `icon` 类名前缀，用于使用自定义图标
     */
    classPrefix: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description  自定义 `icon` 字体基础类名
     */
    fontClassName: {
        type: StringConstructor;
        default: string;
    };
    /**
     * @description 图标颜色
     */
    customColor: {
        type: StringConstructor;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type IconProps = ExtractPropTypes<typeof iconProps>;
declare const iconEmits: {
    click: (evt: Event) => boolean;
};
type IconEmits = typeof iconEmits;

interface ImageInterface {
    src: string;
}

declare const imagepreviewProps: {
    /**
     * @description 是否展示预览图片
     */
    show: BooleanConstructor;
    /**
     * @description 是否缩放图片
     */
    scale: BooleanConstructor;
    /**
     * @description 预览图片数组
     */
    images: {
        type: PropType<ImageInterface[]>;
        default: () => ImageInterface[];
    };
    /**
     * @description 点击图片可以退出预览
     */
    contentClose: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 初始页码
     */
    initNo: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 分页指示器是否展示
     */
    paginationVisible: BooleanConstructor;
    /**
     * @description 分页指示器选中的颜色
     */
    paginationColor: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自动轮播时长，0 表示不会自动轮播
     */
    autoplay: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否显示页码
     */
    showIndex: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * 是否显示关闭图标
     * @description 是否显示关闭图标
     */
    closeable: BooleanConstructor;
    /**
     * @description 关闭图标位置，可选值：`top-left`
     */
    closeIconPosition: {
        type: PropType<"top-right" | "top-left">;
        default: "top-right" | "top-left";
    };
    /**
     * @description 关闭前的回调函数，返回 `false` 可阻止关闭，支持返回 `Promise`
     */
    beforeClose: PropType<Interceptor>;
    /**
     * @description 是否循环播放
     */
    isLoop: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type ImagePreviewProps = ExtractPropTypes<typeof imagepreviewProps>;
declare const imagepreviewEmits: {
    close: () => boolean;
    change: (val: number) => boolean;
    longPress: (image: ImageInterface) => boolean;
};
type ImagePreviewEmits = typeof imagepreviewEmits;

declare const indicatorProps: {
    /**
     * @description 步骤长度
     */
    size: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 当前步骤
     */
    current: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否启用块级布局
     */
    block: BooleanConstructor;
    /**
     * @description 对齐方式，仅在 `block` 为 `true` 时生效, 可选值 `left`, `right`, `center`
     */
    align: {
        type: vue.PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 单数前面是否补 0
     */
    fillZero: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type IndicatorProps = ExtractPropTypes<typeof indicatorProps>;

declare const infiniteloadingProps: {
    hasMore: {
        type: BooleanConstructor;
        default: boolean;
    };
    threshold: {
        type: NumberConstructor;
        default: number;
    };
    upperThreshold: {
        type: NumberConstructor;
        default: number;
    };
    pullIcon: {
        type: StringConstructor;
        default: string;
    };
    pullTxt: {
        type: StringConstructor;
        default: string;
    };
    loadIcon: {
        type: StringConstructor;
        default: string;
    };
    loadTxt: {
        type: StringConstructor;
        default: string;
    };
    loadMoreTxt: {
        type: StringConstructor;
        default: string;
    };
    useWindow: {
        type: BooleanConstructor;
        default: boolean;
    };
    containerId: {
        type: StringConstructor;
        default: string;
    };
    useCapture: {
        type: BooleanConstructor;
        default: boolean;
    };
    isOpenRefresh: {
        type: BooleanConstructor;
        default: boolean;
    };
};
type InfiniteLoadingProps = ExtractPropTypes<typeof infiniteloadingProps>;
declare const infiniteloadingEmits: {
    scrollChange: (val: number) => boolean;
    loadMore: (fun: () => void) => boolean;
    refresh: (fun: () => void) => boolean;
};
type InfiniteLoadingEmits = typeof infiniteloadingEmits;

declare const inputProps: {
    /**
     * @description 输入框类型，支持原生 `input` 标签的所有 `type` 属性，另外还支持 `number` `digit`
     */
    type: {
        type: PropType<"number" | "search" | "date" | "button" | "checkbox" | "radio" | "hidden" | "color" | "text" | "reset" | "range" | "submit" | "week" | "time" | "month" | "image" | "url" | "idcard" | "digit" | "tel" | "safe-password" | "nickname" | "datetime-local" | "email" | "file" | "password">;
        default: "number" | "search" | "date" | "button" | "checkbox" | "radio" | "hidden" | "color" | "text" | "reset" | "range" | "submit" | "week" | "time" | "month" | "image" | "url" | "idcard" | "digit" | "tel" | "safe-password" | "nickname" | "datetime-local" | "email" | "file" | "password";
    };
    /**
     * @description 输入值，双向绑定
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 输入框自定义类名
     */
    inputClass: {
        type: PropType<ClassType>;
        default: string;
    };
    /**
     * @description 输入框自定义样式
     */
    inputStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
    /**
     * @description 输入框为空时占位符
     */
    placeholder: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 指定 placeholder 的样式
     */
    placeholderStyle: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 指定 placeholder 的样式类
     */
    placeholderClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 输入框内容对齐方式，可选值 `left`、`center`、`right`
     */
    inputAlign: {
        type: PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 是否显示必填字段的标签旁边的红色星号
     */
    required: BooleanConstructor;
    /**
     * @description 是否禁用
     */
    disabled: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 是否只读
     */
    readonly: BooleanConstructor;
    /**
     * @description 是否标红
     */
    error: BooleanConstructor;
    /**
     * @description 限制最长输入字符
     */
    maxLength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 展示清除 `Icon`
     */
    clearable: BooleanConstructor;
    /**
     * @description 清除图标的 `font-size` 大小
     */
    clearSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 是否显示下边框
     */
    border: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 格式化函数触发的时机，可选值为 `onChange`、`onBlur`
     */
    formatTrigger: {
        type: PropType<"onChange" | "onBlur">;
        default: "onChange" | "onBlur";
    };
    /**
     * @description 输入内容格式化函数
     */
    formatter: {
        type: PropType<(value: string) => string>;
        default: null;
    };
    /**
     * @description 是否显示限制最长输入字符，需要设置 `max-length` 属性
     */
    showWordLimit: BooleanConstructor;
    /**
     * @description 是否自动获得焦点，`iOS` 系统不支持该属性
     */
    autofocus: BooleanConstructor;
    /**
     * @description 键盘右下角按钮的文字，仅在`type='text'`时生效,可选值 `send`：发送、`search`：搜索、`next`：下一个、`go`：前往、`done`：完成
     */
    confirmType: {
        type: PropType<"search" | "done" | "next" | "send" | "go">;
        default: "search" | "done" | "next" | "send" | "go";
    };
    /**
     * @description  键盘弹起时，是否自动上推页面
     */
    adjustPosition: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否强制使用系统键盘和 `Web-view` 创建的 `input` 元素。为 `true` 时，`confirm-type`、`confirm-hold` 可能失效
     */
    alwaysSystem: BooleanConstructor;
    /**
     * @description 是否在失去焦点后，继续展示清除按钮，在设置 `clearable` 时生效
     */
    showClearIcon: BooleanConstructor;
    /**
     * @description 输入框模式
     */
    inputMode: {
        type: PropType<"search" | "none" | "text" | "url" | "tel" | "email" | "decimal" | "numeric">;
        default: "search" | "none" | "text" | "url" | "tel" | "email" | "decimal" | "numeric";
    };
    /**
     * @description 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
     */
    cursorSpacing: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)
     */
    alwaysEmbed: BooleanConstructor;
    /**
     * @description 点击键盘右下角按钮时是否保持键盘不收起
     */
    confirmHold: BooleanConstructor;
    /**
     * @description 指定focus时的光标位置
     */
    cursor: NumberConstructor;
    /**
     * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用
     */
    selectionStart: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用
     */
    selectionEnd: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description focus时，点击页面的时候不收起键盘
     */
    holdKeyboard: BooleanConstructor;
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
};
type InputProps = ExtractPropTypes<typeof inputProps>;
declare const inputEmits: {
    click: (evt: BaseEvent) => boolean;
    clickInput: (evt: BaseEvent) => boolean;
    blur: (evt: InputOnBlurEvent) => boolean;
    focus: (evt: InputOnFocusEvent) => boolean;
    clear: () => boolean;
    confirm: (evt: InputOnConfirmEvent) => boolean;
    "update:modelValue": (val1: string | number, val2?: BaseEvent) => boolean;
    input: (val: string | number, evt: InputOnInputEvent) => boolean;
};
type InputEmits = typeof inputEmits;

declare const inputAlignType: readonly ["left", "center", "right"];
type InputAlignType = (typeof inputAlignType)[number];
declare const inputFormatTrigger: readonly ["onChange", "onBlur"];
type InputFormatTrigger = (typeof inputFormatTrigger)[number];
declare const inputType: readonly ["text", "number", "idcard", "digit", "tel", "safe-password", "nickname", "button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "password", "radio", "range", "reset", "search", "submit", "time", "url", "week"];
type InputType = (typeof inputType)[number];
declare const inputMode: readonly ["none", "text", "decimal", "numeric", "tel", "search", "email", "url"];
type InputMode = (typeof inputMode)[number];
declare const inputConfirmType: readonly ["send", "search", "next", "go", "done"];
type InputConfirmType = (typeof inputConfirmType)[number];
interface InputTarget extends HTMLInputElement {
    composing?: boolean;
}

declare const inputnumberProps: {
    /**
     * @description 初始值
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 最小值限制
     */
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 最大值限制
     */
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 步长
     */
    step: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否只能输入 step 的倍数
     */
    stepStrictly: BooleanConstructor;
    /**
     * @description 设置保留的小数位
     */
    decimalPlaces: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 禁用所有功能
     */
    disabled: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 只读状态禁用输入框操作行为
     */
    readonly: BooleanConstructor;
    /**
     * @description 输入框宽度
     */
    inputWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 操作加减按钮的尺寸
     */
    buttonSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type InputNumberProps = ExtractPropTypes<typeof inputnumberProps>;
declare const inputnumberEmits: {
    "update:modelValue": (value: number) => boolean;
    change: (value: number, event?: BaseEvent) => boolean;
    focus: (event: InputOnFocusEvent) => boolean;
    blur: (event: InputOnBlurEvent) => boolean;
    reduce: (event: BaseEvent) => boolean;
    add: (event: BaseEvent) => boolean;
    overlimit: (event: BaseEvent, type: "reduce" | "add") => boolean;
};
type InputNumberEmits = typeof inputnumberEmits;

declare const invoiceProps: {
    /**
     * @description 发票数据
     */
    data: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 表单数据对象(使用表单校验时，_必填_)
     */
    formValue: {
        type: ObjectConstructor;
        require: boolean;
        default: {};
    };
    /**
     * @description 是否显示提交按钮
     */
    submit: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type InvoiceProps = ExtractPropTypes<typeof invoiceProps>;
declare const invoiceEmits: {
    onSubmit: (valid: boolean | object, errors: (boolean | ErrorMessage)[]) => boolean;
    scrollBottom: () => boolean;
};
type InvoiceEmits = typeof invoiceEmits;

declare const clientHeight: number;
declare const listProps: {
    /**
     * @description 列表项的高度/预估高度，支持不固定高度
     */
    height: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 列表数据
     */
    listData: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 容器高度(最大值不能超过可视区)
     */
    containerHeight: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ListProps = ExtractPropTypes<typeof listProps>;
declare const listEmits: {
    scrollBottom: () => boolean;
    scroll: () => boolean;
};
type ListEmits = typeof listEmits;

declare const loadingpageProps: {
    /**
     * @description 提示内容
     */
    loadingText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 文字上方用于替换loading动画的图片
     */
    image: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否加载中
     */
    loading: BooleanConstructor;
    /**
     * @description 背景颜色
     */
    bgColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 字体颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 字体大小
     */
    fontSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 图标大小
     */
    iconSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @@description 边框和线条颜色
     */
    loadingColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 层级
     */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type LoadingPageProps = ExtractPropTypes<typeof loadingpageProps>;

declare const marqueeProps: {
    /**
     * @description 抽奖样式
     */
    styleOpt: {
        type: ObjectConstructor;
        default: () => {
            itemStyle: {};
            startStyle: {};
            bgStyle: {
                background: string;
            };
        };
    };
    /**
     * @description 奖品列表
     */
    prizeList: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: boolean;
    };
    /**
     * @description 是否禁用开始抽奖点击
     */
    disabled: BooleanConstructor;
    /**
     * @description 中奖奖品的index
     */
    prizeIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 初始转动速度
     */
    speed: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 预抽奖，转动多少次进入抽奖环节
     */
    circle: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type MarqueeProps = ExtractPropTypes<typeof marqueeProps>;
declare const marqueeEmits: {
    click: () => boolean;
    /**
     * @description 开始跑动的回调函数，此时将接口中的中奖索引，赋值到 prize-index
     */
    startTurns: () => boolean;
    /**
     * @description 停止跑动后的回调函数
     */
    endTurns: () => boolean;
};
type MarqueeEmits = typeof marqueeEmits;

declare const MENU_KEY: unique symbol;
declare const menuProps: {
    /**
     * @description 选项的选中态图标颜色
     */
    activeColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否显示遮罩
     */
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否锁定滚动
     */
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 动画时长
     */
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 标题图标
     */
    titleIcon: StringConstructor;
    /**
     * @description 是否在点击遮罩层后关闭菜单
     */
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 展开方向
     */
    direction: {
        type: vue.PropType<"down" | "up">;
        default: "down" | "up";
    };
    /**
     * @description 滚动后是否固定，可设置固定位置（需要配合 `scrollTop` 使用）
     */
    scrollFixed: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 页面的滚动距离，通过 `onPageScroll` 获取
     */
    scrollTop: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 标题样式类名
     */
    titleClass: StringConstructor[];
    /**
     * @description 收起的图标
     */
    upIcon: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 展开时的图标
     */
    downIcon: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type MenuProps = ExtractPropTypes<typeof menuProps>;

interface MenuItemOption {
    text: string;
    value: number | string;
}
declare const menuitemProps: {
    /**
     * @@description 菜单项标题
     */
    title: StringConstructor;
    /**
     * @description 选项数组
     */
    options: {
        type: vue.PropType<MenuItemOption[]>;
        default: () => MenuItemOption[];
    };
    /**
     * @description 是否禁用菜单
     */
    disabled: BooleanConstructor;
    modelValue: (NumberConstructor | StringConstructor)[];
    /**
     * @description 可以设置一行展示多少列 `options`
     */
    cols: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 选项选中时自定义标题样式类
     */
    activeTitleClass: StringConstructor;
    /**
     * @description 选项非选中时自定义标题样式类
     */
    inactiveTitleClass: StringConstructor;
    /**
     * @description 选项选中时选中图标
     */
    optionIcon: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type MenuItemProps = ExtractPropTypes<typeof menuitemProps>;
declare const menuitemEmits: {
    "update:modelValue": (value: number | string) => boolean;
    change: (value: number | string) => boolean;
    open: () => boolean;
    close: () => boolean;
    itemClick: (item: MenuItemOption) => boolean;
};
type MenuitemEmits = typeof menuitemEmits;
interface MenuItemInst {
    /**
     * @description 变更选择项
     */
    change: (value?: number | string) => any;
    /**
     * @description 切换菜单展示状态，传 `true` 为显示，`false` 为隐藏，不传参为取反
     */
    toggle: (show?: boolean) => boolean;
    /**
     * @description 打开菜单栏
     */
    open: () => void;
    /**
     * @description 关闭菜单栏
     */
    close: () => void;
}

declare const navbarProps: {
    /**
     * @description 图标与字体颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 图标与字体大小
     */
    size: (NumberConstructor | StringConstructor)[];
    /**
     * @description 是否展示左侧箭头
     */
    leftShow: BooleanConstructor;
    /**
     * @description 中间文字标题
     */
    title: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 中间标题icon
     */
    titleIcon: BooleanConstructor;
    /**
     * @description 左侧文字
     */
    leftText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 右侧按钮文字
     */
    desc: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否固定到顶部
     */
    fixed: BooleanConstructor;
    /**
     * @description 是否开启顶部安全区适配
     */
    safeAreaInsetTop: BooleanConstructor;
    /**
     * @description 是否显示下边框
     */
    border: BooleanConstructor;
    /**
     * @description 固定在顶部时，是否在标签位置生成一个等高的占位元素
     */
    placeholder: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 导航栏 `z-index`
     */
    zIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type NavBarProps = ExtractPropTypes<typeof navbarProps>;
declare const navbarEmits: {
    clickBack: () => boolean;
    clickTitle: () => boolean;
    clickIcon: () => boolean;
    clickRight: () => boolean;
    /**
     * @deprecated This function will be deprecated in future releases. Please migrate to `clickBack`
     */
    onClickBack: () => boolean;
    /**
     * @deprecated This function will be deprecated in future releases. Please migrate to `clickTitle`
     */
    onClickTitle: () => boolean;
    /**
     * @deprecated This function will be deprecated in future releases. Please migrate to `clickIcon`
     */
    onClickIcon: () => boolean;
    /**
     * @deprecated This function will be deprecated in future releases. Please migrate to `clickRight`
     */
    onClickRight: () => boolean;
};
type NavBarEmits = typeof navbarEmits;

interface stateProps {
    wrapWidth: number;
    firstRound: boolean;
    duration: number;
    offsetWidth: number;
    showNoticebar: boolean;
    animationClass: string;
    animate: boolean;
    scrollList: any[];
    distance: number;
    timer: null;
    keepAlive: boolean;
    isCanScroll: null | boolean;
    showNotica: boolean;
    id: number;
}
declare const noticebarProps: {
    /**
     * @description 滚动的方向，可选 `across`、`vertical`
     */
    direction: {
        type: vue.PropType<"vertical" | "across">;
        default: "vertical" | "across";
    };
    /**
     * @description 纵向滚动数据列表, `vertical`方向
     */
    list: {
        type: vue.PropType<(string | object)[]>;
        default: () => (string | object)[];
    };
    /**
     * @description 停留时间(毫秒),`vertical`方向
     */
    standTime: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 稍复杂的动画，耗能会高,`vertical`方向
     */
    complexAm: BooleanConstructor;
    /**
     * @description 每一个滚动列的高度(px)，注意：在使用 slot 插槽定义滚动单元时，按照实际高度修改此值
     */
    height: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 提示的信息
     */
    text: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否启用关闭模式
     */
    closeMode: BooleanConstructor;
    /**
     * @description 是否展示左侧图标, 滚动方向为 `across` 生效
     */
    leftIcon: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 导航栏的文字颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 导航栏的背景颜色
     */
    background: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 延时多少秒
     */
    delay: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否可以滚动
     */
    scrollable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 滚动速率 (px/s)
     */
    speed: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否开启文本换行,`scrollable` 会设置为 `false`
     */
    wrapable: BooleanConstructor;
    /**
     * @description `vertical`方向时`list`属性如果传入数组对象，显示文本的字段名
     */
    fieldName: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type NoticeBarProps = ExtractPropTypes<typeof noticebarProps>;
declare const noticebarEmits: {
    click: (value: Event | string) => boolean;
    close: (evt: Event | string) => boolean;
    acrossEnd: (evt: Event) => boolean;
};
type NoticeBarEmits = typeof noticebarEmits;

declare const notifyPosition: readonly ["top", "bottom"];
type NotifyPosition = (typeof notifyPosition)[number];
declare const notifyType: readonly ["base", "primary", "success", "danger", "warning", "custom"];
type NotifyType = (typeof notifyType)[number];
interface NotifyOptions {
    /**
     * @description 显示与否
     */
    visible?: boolean;
    /**
     * @description 提示的信息类型，可选值为`base` `primary` `success` `danger` `warning`
     */
    type?: NotifyType;
    /**
     * @description 展示文案，支持通过`\n`换行
     */
    msg?: string;
    /**
     * @description 自定义位置，可选值为 `top` `bottom`
     */
    position?: NotifyPosition;
    /**
     * @description 展示时长(ms)，值为 0 时，notify 不会消失
     */
    duration?: number;
    /**
     * @description 自定义类名
     */
    className?: string;
    /**
     * @description 组件z-index
     */
    zIndex?: number;
    /**
     * @description 字体颜色
     */
    customColor?: string;
    /**
     * @description 背景颜色
     */
    background?: string;
    /**
     * @description 是否留出顶部安全距离（默认为状态栏高度）
     */
    safeAreaInsetTop?: boolean;
    /**
     * @description 是否留出底部安全距离（启用后通过 `safeHeight` 指定距离）
     */
    safeAreaInsetBottom?: boolean;
    /**
     * @description 自定义安全距离
     */
    safeHeight?: number | string;
    /**
     * @description 点击时的回调函数
     */
    onClick?: Function;
    /**
     * @description 关闭时的回调函数
     */
    onClose?: Function;
    /**
     * @description 关闭动画完成时回调函数
     */
    onClosed?: Function;
}
interface NotifyInst {
    /**
     * @deprecated 使用`show`、`primary`、`success`、`danger`、`warning`代替
     * @description 显示通知
     */
    showNotify: (options: NotifyOptions) => void;
    /**
     * @deprecated 使用`hide`代替
     * @description 隐藏通知
     */
    hideNotify: () => void;
    /**
     * @description 显示通知
     */
    show: (type: NotifyType, msg: string, options?: NotifyOptions) => void;
    /**
     * @description 主要通知
     */
    primary: (msg: string, options?: NotifyOptions) => void;
    /**
     * @description 成功通知
     */
    success: (msg: string, options?: NotifyOptions) => void;
    /**
     * @description 危险通知
     */
    danger: (msg: string, options?: NotifyOptions) => void;
    /**
     * @description 警告通知
     */
    warning: (msg: string, options?: NotifyOptions) => void;
    /**
     * @description 自定义通知
     */
    custom: (msg: string, options?: NotifyOptions) => void;
    /**
     * @description 隐藏通知
     */
    hide: () => void;
}

declare const notifyDefaultOptionsKey = "__NOTIFY_OPTIONS__";
declare const notifyDefaultOptions: Required<Pick<NotifyOptions, 'visible' | 'type' | 'msg' | 'position' | 'duration' | 'zIndex'>>;
declare const notifyProps: {
    /**
     * @description 显示与否
     */
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 配置注入的key
     */
    selector: StringConstructor;
    /**
     * @description 提示的信息类型，可选值为`base` `primary` `success` `danger` `warning`
     */
    type: {
        type: vue.PropType<"custom" | "primary" | "success" | "warning" | "danger" | "base">;
        default: "custom" | "primary" | "success" | "warning" | "danger" | "base";
    };
    /**
     * @description 展示文案，支持通过`\n`换行
     */
    msg: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 自定义位置，可选值为 `top` `bottom`
     */
    position: {
        type: vue.PropType<"bottom" | "top">;
        default: "bottom" | "top";
    };
    /**
     * @description 展示时长(ms)，值为 0 时，notify 不会消失
     */
    duration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 自定义类名
     */
    className: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 组件z-index
     */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 字体颜色
     */
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 背景颜色
     */
    background: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否留出顶部安全距离（默认为状态栏高度）
     */
    safeAreaInsetTop: BooleanConstructor;
    /**
     * @description 是否留出底部安全距离（启用后通过 `safeHeight` 指定距离）
     */
    safeAreaInsetBottom: BooleanConstructor;
    /**
     * @description 自定义安全距离
     */
    safeHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 点击时的回调函数
     */
    onClick: FunctionConstructor;
    /**
     * @description 关闭时的回调函数
     */
    onClose: FunctionConstructor;
    /**
     * @description 关闭动画完成时回调函数
     */
    onClosed: FunctionConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type NotifyProps = ExtractPropTypes<typeof notifyProps>;
declare const notifyEmits: {
    "update:visible": (value: boolean) => boolean;
    click: () => boolean;
    close: () => boolean;
    closed: () => boolean;
};
type NotifyEmits = typeof notifyEmits;

declare const numberkeyboardProps: {
    /**
     * @description 是否显示键盘
     */
    visible: BooleanConstructor;
    /**
     * @description 当前输入值
     */
    modelValue: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 键盘标题
     */
    title: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 键盘模式
     * - `default`：默认样式
     * - `rightColumn`：带右侧栏
     */
    type: {
        type: vue.PropType<"default" | "rightColumn">;
        default: "default" | "rightColumn";
    };
    /**
     * @description 随机数
     */
    randomKeys: BooleanConstructor;
    /**
     * @description 自定义键盘额外的键
     * - 数组形式最多支持添加2个,超出默认取前2项
     */
    customKey: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否显示遮罩
     */
    overlay: BooleanConstructor;
    /**
     * @description 输入值最大长度，结合 v-model 使用
     */
    maxlength: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 自定义完成按钮文字，如"支付"，"下一步"，"提交"等
     */
    confirmText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 自定义弹框类名
     */
    popClass: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type NumberKeyBoardProps = ExtractPropTypes<typeof numberkeyboardProps>;
declare const numberkeyboardEmits: {
    input: (val: string | number) => boolean;
    delete: () => boolean;
    close: () => boolean;
    "update:visible": (visible: boolean) => boolean;
    "update:modelValue": (val: string | number) => boolean;
    confirm: () => boolean;
};
type NumberKeyBoardEmits = typeof numberkeyboardEmits;

declare const overlayProps: {
    /**
     * @description 控制遮罩的显示/隐藏
     */
    visible: BooleanConstructor;
    /**
     * @description 自定义遮罩层级
     */
    zIndex: NumberConstructor;
    /**
     * @description 显示/隐藏的动画时长，单位毫秒
     */
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 自定义遮罩类名
     */
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自定义遮罩样式
     */
    overlayStyle: PropType<CSSProperties>;
    /**
     * @description 遮罩显示时的背景是否锁定
     */
    lockScroll: BooleanConstructor;
    /**
     * @description 点击遮罩时是否关闭
     */
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否保留遮罩关闭后的内容
     */
    destroyOnClose: BooleanConstructor;
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type OverlayProps = ExtractPropTypes<typeof overlayProps>;
declare const overlayEmits: {
    "update:visible": (visible: boolean) => boolean;
    click: (evt: any) => boolean;
};
type OverlayEmits = typeof overlayEmits;

declare const paginationProps: {
    /**
     * @description 当前页码
     */
    modelValue: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 显示模式,可选值为 `simple`
     */
    mode: {
        type: vue.PropType<"multi" | "simple">;
        default: "multi" | "simple";
    };
    /**
     * @description 上一页按钮文字
     */
    prevText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 下一页按钮文字
     */
    nextText: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 总页数
     */
    pageCount: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 总记录数
     */
    totalItems: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 每页记录数
     */
    itemsPerPage: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 显示的页码个数
     */
    showPageSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 是否显示省略号
     */
    forceEllipses: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type PaginationProps = ExtractPropTypes<typeof paginationProps>;
declare const paginationEmits: {
    "update:modelValue": (val: number) => boolean;
    change: (val: number) => boolean;
};
type PaginationEmits = typeof paginationEmits;

type PopoverTheme = 'light' | 'dark';
interface PopoverRootPosition {
    width: number;
    height: number;
    left: number;
    top: number;
    right: number;
}
declare const popoverLocation: readonly ["bottom", "top", "left", "right", "top-start", "top-end", "bottom-start", "bottom-end", "left-start", "left-end", "right-start", "right-end"];
type PopoverLocation = (typeof popoverLocation)[number];
interface PopoverList {
    name: string;
    icon?: string;
    disabled?: boolean;
    className?: any;
    [key: PropertyKey]: any;
}

declare const popoverProps: {
    /**
     * @description 是否展示气泡弹出层
     */
    visible: BooleanConstructor;
    /**
     * @description 选项列表
     */
    list: {
        type: PropType<PopoverList[]>;
        default: () => PopoverList[];
    };
    /**
     * @description 主题风格，可选值为 dark
     */
    theme: {
        type: PropType<PopoverTheme>;
        default: PopoverTheme;
    };
    /**
     * @description 弹出位置
     */
    location: {
        type: PropType<"left" | "right" | "bottom" | "top" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end">;
        default: "left" | "right" | "bottom" | "top" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    };
    /**
     * @description 出现位置的偏移量
     */
    offset: {
        type: PropType<number[]>;
        default: () => number[];
    };
    /**
     * @description 小箭头的偏移量
     */
    arrowOffset: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否显示小箭头
     */
    showArrow: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 动画时长，单位毫秒
     */
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否显示遮罩层
     */
    overlay: BooleanConstructor;
    /**
     * @description 自定义遮罩层类名
     */
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自定义遮罩层样式
     */
    overlayStyle: {
        type: PropType<CSSProperties>;
    };
    /**
     * @description 是否在点击遮罩层后关闭菜单
     */
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否在点击选项后关闭
     */
    closeOnClickAction: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否在点击外部元素后关闭菜单
     */
    closeOnClickOutside: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自定义背景色
     */
    bgColor: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 自定义目标元素 id, 暂不支持该属性
     * @deprecated
     */
    targetId: {
        type: PropType<string>;
        default: string;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type PopoverProps = ExtractPropTypes<typeof popoverProps>;
declare const popoverEmits: {
    update: (val: boolean) => boolean;
    "update:visible": (val: boolean) => boolean;
    open: () => boolean;
    close: () => boolean;
    choose: (item: any, index: number) => boolean;
};
type PopoverEmits = typeof popoverEmits;

declare const popupProps: {
    /**
     * @description 弹出位置（top,bottom,left,right,center）
     */
    position: {
        type: PropType<Position>;
        default: Position;
    };
    /**
     * @description 动画名
     */
    transition: {
        type: PropType<NutAnimationName>;
        default: string;
    };
    /**
     * @description 自定义弹框类名
     */
    popClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 是否显示圆角
     */
    round: BooleanConstructor;
    /**
     * @description 是否显示关闭按钮
     */
    closeable: BooleanConstructor;
    /**
     * @description 关闭按钮图标
     */
    closeIcon: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 关闭按钮位置（top-left,top-right,bottom-left,bottom-right）
     */
    closeIconPosition: {
        type: PropType<"top-right" | "bottom-right" | "bottom-left" | "top-left">;
        default: "top-right" | "bottom-right" | "bottom-left" | "top-left";
    };
    /**
     * @description 是否保留弹层关闭后的内容
     */
    destroyOnClose: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否显示遮罩层
     */
    overlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否开启 iPhone 系列全面屏底部安全区适配，仅当 `position` 为 `bottom` 时有效
     */
    safeAreaInsetBottom: BooleanConstructor;
    /**
     * @description 是否开启 iPhone 顶部安全区适配
     */
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
    visible: BooleanConstructor;
    zIndex: NumberConstructor;
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    overlayClass: {
        type: PropType<string>;
        default: string;
    };
    overlayStyle: PropType<vue.CSSProperties>;
    lockScroll: BooleanConstructor;
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
};
type PopupProps = ExtractPropTypes<typeof popupProps>;
declare const popupEmits: {
    "update:visible": (value: boolean) => boolean;
    'click-pop': (event: any) => boolean;
    'click-close-icon': () => boolean;
    'click-overlay': () => boolean;
    open: () => boolean;
    opened: () => boolean;
    close: () => boolean;
    closed: () => boolean;
    /**
     * @deprecated
     */
    opend: () => boolean;
};
type PopupEmits = typeof popupEmits;

declare function usePopup(props: PopupProps, emit: SetupContext<PopupEmits>['emit']): {
    popStyle: vue.ComputedRef<string>;
    transitionName: vue.ComputedRef<"none" | "zoom" | "fade" | "fade-up" | "fade-down" | "fade-left" | "fade-right" | "slide-up" | "slide-down" | "slide-left" | "slide-right">;
    classes: vue.ComputedRef<string>;
    onClick: (e: any) => void;
    onClickCloseIcon: (e: any) => void;
    onClickOverlay: () => void;
    onOpened: () => void;
    onClosed: () => void;
    innerVisible: vue.Ref<boolean>;
    innerIndex: vue.Ref<number | undefined>;
    showSlot: vue.Ref<boolean>;
};

declare const priceProps: {
    /**
     * @description 价格数量
     */
    price: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否需要加上 symbol 符号
     */
    needSymbol: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 符号类型
     */
    symbol: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 小数位位数
     */
    decimalDigits: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否按照千分号形式显示
     */
    thousands: BooleanConstructor;
    /**
     * @description 符号显示在价格前或者后，`before`、`after`
     */
    position: {
        type: vue.PropType<"after" | "before">;
        default: "after" | "before";
    };
    /**
     * @description 价格尺寸，`small`、`normal`、`large`
     */
    size: {
        type: vue.PropType<"normal" | "large" | "small">;
        default: "normal" | "large" | "small";
    };
    /**
     * @description 是否展示划线价
     */
    strikeThrough: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type PriceProps = ExtractPropTypes<typeof priceProps>;

declare const progressProps: {
    /**
     * @description 百分比
     */
    percentage: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
        required: boolean;
    };
    /**
     * 是否需要展示百分号
     *
     * @description 是否需要展示百分号
     */
    isShowPercentage: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 进度条背景色
     */
    strokeColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 进度条宽度
     */
    strokeWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 进度条及文字尺寸,可选值 `small` `base` `large`
     */
    size: {
        type: vue.PropType<"large" | "small" | "base">;
        default: "large" | "small" | "base";
    };
    /**
     * @description 是否显示进度条文字内容
     */
    showText: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 进度条文字显示位置(false:外显，true:内显)
     */
    textInside: BooleanConstructor;
    /**
     * @description 进度条文字颜色设置
     */
    textColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 进度条文字背景颜色设置
     */
    textBackground: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 进度条当前状态，可选值`active(展示动画效果)` `icon(展示icon标签)`
     */
    status: {
        type: vue.PropType<"text" | "icon" | "active">;
        default: "text" | "icon" | "active";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ProgressProps = ExtractPropTypes<typeof progressProps>;

declare const radioProps: {
    /**
     * @description 是否禁用选择
     */
    disabled: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 图标尺寸
     */
    iconSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 单选框标识
     */
    label: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: string;
    };
    /**
     * @description 形状，可选值为 button、round
     */
    shape: {
        type: vue.PropType<"button" | "round">;
        default: "button" | "round";
    };
    /**
     * @description 尺寸，可选值为 `large` `small` `mini` `normal`，仅在 shape 为 `button` 时生效
     */
    size: {
        type: vue.PropType<"normal" | "large" | "small" | "mini">;
        default: "normal" | "large" | "small" | "mini";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type RadioProps = ExtractPropTypes<typeof radioProps>;
declare const RADIO_KEY: unique symbol;

declare const radiogroupProps: {
    /**
     * @description 当前选中项的标识符，与 `label` 值一致时呈选中状态
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: string;
    };
    /**
     * @description 使用横纵方向，可选值 `horizontal`、`vertical`
     */
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    /**
     * @description 文本所在的位置，可选值：`left`,`right`
     */
    textPosition: {
        type: vue.PropType<"left" | "right">;
        default: "left" | "right";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type RadioGroupProps = ExtractPropTypes<typeof radiogroupProps>;
declare const radiogroupEmits: {
    change: (val: string | number | boolean) => boolean;
    "update:modelValue": (val: string | boolean | number) => boolean;
};
type RadioGroupEmits = typeof radiogroupEmits;

type RangeArrayValue = [number, number];
type RangeValue = number | RangeArrayValue;

declare const rangeProps: {
    /**
     * @description 当前进度百分比
     */
    modelValue: {
        type: PropType<RangeValue>;
        default: number;
    };
    /**
     * @description 是否开启双滑块模式
     */
    range: BooleanConstructor;
    /**
     * @description 最大值
     */
    max: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 最小值
     */
    min: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 步长
     */
    step: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否禁用滑块
     */
    disabled: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 是否竖向展示
     */
    vertical: BooleanConstructor;
    /**
     * @description 是否隐藏范围值
     */
    hiddenRange: BooleanConstructor;
    /**
     * @description 是否隐藏标签
     */
    hiddenTag: BooleanConstructor;
    /**
     * @description 进度条激活态颜色
     */
    activeColor: StringConstructor;
    /**
     * @description 进度条非激活态颜色
     */
    inactiveColor: StringConstructor;
    /**
     * @description 按钮颜色
     */
    buttonColor: StringConstructor;
    /**
     * @description 刻度标示
     */
    marks: {
        type: PropType<any>;
        default: () => any;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type RangeProps = ExtractPropTypes<typeof rangeProps>;
declare const rangeEmits: {
    "update:modelValue": (val: RangeValue) => val is number | RangeArrayValue;
    dragStart: () => boolean;
    change: (val: RangeValue) => val is number | RangeArrayValue;
    dragEnd: () => boolean;
};
type RangeEmits = typeof rangeEmits;

declare const rateProps: {
    /**
     * @description 当前 `star` 数，可使用 `v-model` 双向绑定数据
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description `star` 总数
     */
    count: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 图标选中颜色
     */
    activeColor: StringConstructor;
    /**
     * @description 图标未选中颜色
     */
    voidColor: StringConstructor;
    /**
     * @description 是否半星
     */
    allowHalf: BooleanConstructor;
    /**
     * @description 是否只读
     */
    readonly: BooleanConstructor;
    /**
     * @description 是否禁用
     */
    disabled: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 间距
     */
    spacing: (NumberConstructor | StringConstructor)[];
    /**
     * @description `Icon` 尺寸大小，如 `20px` `2em` `2rem`
     */
    size: (NumberConstructor | StringConstructor)[];
    /**
     * @description 自定义 `Icon`
     */
    customIcon: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type RateProps = ExtractPropTypes<typeof rateProps>;
declare const rateEmits: {
    "update:modelValue": (val: number) => boolean;
    change: (val: number) => boolean;
};
type RateEmits = typeof rateEmits;

declare const rowProps: {
    /**
     * @description 布局方式，可选值为 `flex`
     */
    type: {
        type: vue.PropType<"" | "flex">;
        default: "" | "flex";
    };
    /**
     * @description 列元素之间的间距（单位为 `px`）
     */
    gutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description `Flex` 主轴对齐方式，可选值为 `start` `end` `center` `space-around` `space-between` `space-evenly`
     */
    justify: {
        type: vue.PropType<"space-around" | "space-between" | "space-evenly" | "center" | "end" | "start">;
        default: "space-around" | "space-between" | "space-evenly" | "center" | "end" | "start";
    };
    /**
     * @description `Flex` 交叉轴对齐方式，可选值为 `flex-start` `center` `flex-end`
     */
    align: {
        type: vue.PropType<"center" | "flex-end" | "flex-start">;
        default: "center" | "flex-end" | "flex-start";
    };
    /**
     * @description `Flex` 是否换行，可选值为 `nowrap` `wrap` `reverse`
     */
    flexWrap: {
        type: vue.PropType<"reverse" | "nowrap" | "wrap">;
        default: "reverse" | "nowrap" | "wrap";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type RowProps = ExtractPropTypes<typeof rowProps>;

declare const safeareaProps: {
    /**
     * @description 安全区的位置
     */
    position: PropType<"top" | "bottom">;
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type SafeAreaProps = ExtractPropTypes<typeof safeareaProps>;

declare const searchbarProps: {
    /**
     * @description 当前输入的值
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 输入框类型
     */
    inputType: {
        type: vue.PropType<"number" | "search" | "date" | "button" | "checkbox" | "radio" | "hidden" | "color" | "text" | "reset" | "range" | "submit" | "week" | "time" | "month" | "image" | "url" | "idcard" | "digit" | "tel" | "safe-password" | "nickname" | "datetime-local" | "email" | "file" | "password">;
        default: "number" | "search" | "date" | "button" | "checkbox" | "radio" | "hidden" | "color" | "text" | "reset" | "range" | "submit" | "week" | "time" | "month" | "image" | "url" | "idcard" | "digit" | "tel" | "safe-password" | "nickname" | "datetime-local" | "email" | "file" | "password";
    };
    /**
     * @description 搜索框形状，可选值为 `square` `round`
     */
    shape: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 最大输入长度
     */
    maxLength: (NumberConstructor | StringConstructor)[];
    /**
     * @description 输入框默认占位符
     */
    placeholder: StringConstructor;
    /**
     * @description 是否展示清除按钮
     */
    clearable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 自定义清除按钮图标
     */
    clearIcon: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 输入框外部背景
     */
    background: StringConstructor;
    /**
     * @description 输入框内部背景
     */
    inputBackground: StringConstructor;
    /**
     * @description 聚焦时搜索框样式
     */
    focusStyle: {
        type: vue.PropType<CSSProperties>;
        default: () => CSSProperties;
    };
    /**
     * @description 是否自动聚焦
     */
    autofocus: BooleanConstructor;
    /**
     * @description 是否禁用输入框
     */
    disabled: {
        type: vue.PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 输入框只读
     */
    readonly: BooleanConstructor;
    /**
     * @description 对齐方式，可选 `left` `center` `right`
     */
    inputAlign: {
        type: vue.PropType<"left" | "right" | "center">;
        default: "left" | "right" | "center";
    };
    /**
     * @description 键盘右下角按钮的文字，仅在`type='text'`时生效，可选值 `send`：发送、`search`：搜索、`next`：下一个、`go`：前往、`done`：完成
     */
    confirmType: {
        type: vue.PropType<"search" | "done" | "next" | "send" | "go">;
        default: "search" | "done" | "next" | "send" | "go";
    };
    /**
     * @description 是否开启 iphone 系列全面屏底部安全区适配
     */
    safeAreaInsetBottom: BooleanConstructor;
    /**
     * @description 指定的距离的最小值作为光标与键盘的距离
     */
    cursorSpacing: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SearchbarProps = ExtractPropTypes<typeof searchbarProps>;
declare const searchbarEmits: {
    "update:modelValue": (val: string, event: InputOnInputEvent) => boolean;
    change: (val: string, event: InputOnInputEvent) => boolean;
    blur: (val: string, event: InputOnBlurEvent) => boolean;
    focus: (val: string, event: InputOnFocusEvent) => boolean;
    clear: (val: string) => boolean;
    search: (val: string) => boolean;
    clickInput: (val: string, event: Event) => boolean;
    clickLeftIcon: (val: string, event: Event) => boolean;
    clickRightIcon: (val: string, event: Event) => boolean;
};
type SearchbarEmits = typeof searchbarEmits;

declare const searchbarShape: string[];
type SearchbarShape = (typeof searchbarShape)[number];

declare const shakediceProps: {
    /**
     * @description 旋转时间，秒
     */
    time: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 旋转速度,ms
     */
    speed: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 中奖的 id(1 为 1 点，依次类推)
     */
    id: {
        type: NumberConstructor;
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ShakeDiceProps = ExtractPropTypes<typeof shakediceProps>;
declare const shakediceEmits: {
    end: () => boolean;
};
type ShakeDiceEmits = typeof shakediceEmits;
interface ShakeDiceInst {
    shake: () => true;
}

declare const shortpasswordProps: {
    /**
     * @description 标题
     */
    title: StringConstructor;
    /**
     * @description 密码框描述
     */
    desc: StringConstructor;
    /**
     * @description 提示语
     */
    tips: StringConstructor;
    /**
     * @description 是否展示短密码框
     */
    visible: BooleanConstructor;
    /**
     * @description 密码初始值
     */
    modelValue: StringConstructor;
    /**
     * @description 错误信息提示
     */
    errorMsg: StringConstructor;
    /**
     * @description 是否点击遮罩关闭
     */
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 密码长度，取值为4~6
     */
    length: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ShortPasswordProps = ExtractPropTypes<typeof shortpasswordProps>;
declare const shortpasswordEmits: {
    "update:modelValue": (val: string | number, event: Event) => boolean;
    "update:visible": (val: boolean) => boolean;
    complete: (val: string) => boolean;
    tips: () => boolean;
    close: () => boolean;
    focus: () => boolean;
};
type ShortPasswordEmits = typeof shortpasswordEmits;

declare const SIDEN_NAVBAR_KEY: unique symbol;
declare const sidenavbarProps: {
    /**
     * @description 导航缩进宽度
     */
    offset: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SidenavbarProps = ExtractPropTypes<typeof sidenavbarProps>;

declare const sidenavbaritemProps: {
    /**
     * @description 导航标题
     */
    title: StringConstructor;
    /**
     * @description 导航唯一标识
     */
    ikey: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SideNavbaritemProps = ExtractPropTypes<typeof sidenavbaritemProps>;
declare const sidenavbaritemEmits: {
    click: () => boolean;
};
type SideNavbaritemEmits = typeof sidenavbaritemEmits;

declare const signatureProps: {
    /**
     * @description 线条的宽度
     */
    lineWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 绘图笔触颜色
     */
    strokeStyle: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 图片格式
     */
    type: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 不支持Canvas情况下的展示文案
     */
    unSupportTpl: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SignatureProps = ExtractPropTypes<typeof signatureProps>;
declare const signatureEmits: {
    start: () => boolean;
    end: () => boolean;
    signing: (event: Event) => boolean;
    confirm: (canvas: any, filePath?: string) => boolean;
    clear: () => boolean;
};
type SignatureEmits = typeof signatureEmits;

declare const skeletonProps: {
    /**
     * @description 是否显示骨架屏
     */
    loading: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 每行宽度
     */
    width: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 每行高度
     */
    height: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否开启骨架屏动画
     */
    animated: BooleanConstructor;
    /**
     * @description 是否显示头像
     */
    avatar: BooleanConstructor;
    /**
     * @description 头像形状
     */
    avatarShape: {
        type: vue.PropType<"round" | "square">;
        default: "round" | "square";
    };
    /**
     * @description 头像大小
     */
    avatarSize: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 标题/段落是否采用圆角风格
     */
    round: BooleanConstructor;
    /**
     * @description 设置段落行数
     */
    row: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否显示段落标题
     */
    title: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SkeletonProps = ExtractPropTypes<typeof skeletonProps>;

declare const skuProps: {
    /**
     * @description 是否显示商品规格弹框
     */
    visible: BooleanConstructor;
    /**
     * @description 商品 sku 数据
     */
    sku: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 商品信息
     */
    goods: ObjectConstructor;
    /**
     * @description 设置 inputNumber 最大值
     */
    stepperMax: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 设置 inputNumber 最小值
     */
    stepperMin: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * 底部按钮设置。[`confirm`, `buy`, `cart`] 分别对应确定、立即购买、加入购物车
     * @description 底部按钮设置
     */
    btnOptions: {
        type: vue.PropType<string[]>;
        default: () => string[];
    };
    /**
     * @description 按钮上部添加文案，默认为空，有值时显示
     */
    btnExtraText: StringConstructor;
    /**
     * @description 数量选择组件左侧文案
     */
    stepperTitle: StringConstructor;
    /**
     * @description InputNumber 与标题之间的文案
     */
    stepperExtraText: {
        type: (BooleanConstructor | FunctionConstructor)[];
        default: boolean;
    };
    /**
     * @description 立即购买按钮文案
     */
    buyText: StringConstructor;
    /**
     * @description 加入购物车按钮文案
     */
    addCartText: StringConstructor;
    /**
     * @description 确定按钮文案
     */
    confirmText: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SkuProps = ExtractPropTypes<typeof skuProps>;
declare const skuEmits: {
    "update:visible": (val: boolean) => boolean;
    selectSku: (val: any) => boolean;
    changeStepper: (val: number) => boolean;
    clickBtnOperate: (val: {
        type: string;
        value: string | number;
    }) => boolean;
    clickCloseIcon: () => boolean;
    clickOverlay: () => boolean;
    close: () => boolean;
    reduce: (val: number | object) => boolean;
    add: (val: number | object) => boolean;
    overLimit: (val: any) => boolean;
};
type SkuEmits = typeof skuEmits;

declare const stepProps: {
    /**
     * @description 流程步骤的标题
     */
    title: StringConstructor;
    /**
     * @description 流程步骤的描述性文字(支持 html 结构)
     */
    content: StringConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type StepProps = ExtractPropTypes<typeof stepProps>;
declare const stepEmits: {
    clickStep: (val: number) => boolean;
};
type StepEmits = typeof stepEmits;

declare const stepsProps: {
    /**
     * @description 显示方向，`horizontal`,`vertical`
     */
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    /**
     * @description 当前所在的步骤
     */
    current: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 点状步骤条
     */
    progressDot: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type StepsProps = ExtractPropTypes<typeof stepsProps>;
declare const stepsEmits: {
    clickStep: (val: number) => boolean;
};
type StepsEmits = typeof stepsEmits;

declare const stickyProps: {
    /**
     * @description 吸顶距离
     */
    offsetTop: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 吸附时的层级
     */
    zIndex: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 导航栏高度，自定义导航栏时，需要传入此值
     * - H5端的导航栏属于“自定义”导航栏的范畴，因为它是非原生的，与普通元素一致
     */
    customNavHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否开启吸顶功能
     */
    disabled: BooleanConstructor;
    /**
     * @description 吸顶区域的背景颜色
     */
    bgColor: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type StickyProps = ExtractPropTypes<typeof stickyProps>;

declare const subsidenavbarProps: {
    /**
     * @description 导航标题
     */
    title: StringConstructor;
    /**
     * @description 导航唯一标识
     */
    ikey: (NumberConstructor | StringConstructor)[];
    /**
     * @description 导航是否默认展开
     */
    open: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SubSidenavbarProps = ExtractPropTypes<typeof subsidenavbarProps>;
declare const subsidenavbarEmits: {
    titleClick: () => boolean;
};
type SubSidenavbarEmits = typeof subsidenavbarEmits;

declare const swipeDirection: readonly ["left", "right", ""];
type SwipeDirection = (typeof swipeDirection)[number];
declare const swipePosition: readonly ["left", "content", "right"];
type SwipePosition = (typeof swipePosition)[number];
interface SwipeToggleEvent {
    /**
     * swipe名称
     */
    name: string;
    /**
     * 滑动方向
     */
    direction: SwipeDirection;
    /**
     * @deprecated 使用 `direction` 代替
     * 滑动方向
     */
    position: SwipeDirection;
}
interface SwipeInst {
    /**
     * 滑动单元格侧边栏，left 指向左滑，right 指向右滑
     * @param position
     */
    open: (direction?: SwipeDirection) => void;
    /**
     * 收起单元格侧边栏
     */
    close: () => void;
}

declare const swipeProps: {
    /**
     * @description 唯一标识
     */
    name: StringConstructor;
    /**
     * @description 是否阻止滑动事件冒泡
     */
    touchMoveStopPropagation: BooleanConstructor;
    /**
     * @description 是否阻止滑动事件行为
     */
    touchMovePreventDefault: BooleanConstructor;
    /**
     * @description 是否禁用滑动
     */
    disabled: BooleanConstructor;
    /**
     * @description 点击自动关闭的部分
     */
    closeOnClick: {
        type: vue.PropType<("left" | "right" | "content")[]>;
        default: () => ("left" | "right" | "content")[];
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SwipeProps = ExtractPropTypes<typeof swipeProps>;
declare const swipeEmits: {
    open: (event: SwipeToggleEvent) => boolean;
    close: (event: SwipeToggleEvent) => boolean;
    click: (val: string) => boolean;
};
type SwipeEmits = typeof swipeEmits;

declare const swipegroupProps: {
    /**
     * @description 控制内部 Swipe 互斥，即滑动打开某一个 Swipe 时，触发其余 Swipe 的 close 方法
     */
    lock: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SwipeGroupProps = ExtractPropTypes<typeof swipegroupProps>;

declare const swiperProps: {
    /**
     * @description 轮播卡片的宽度
     */
    width: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 轮播卡片的高度
     */
    height: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 轮播方向,可选值 `horizontal`, `vertical`
     */
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    /**
     * @description 分页指示器是否展示
     */
    paginationVisible: BooleanConstructor;
    /**
     * @description 分页指示器选中的颜色
     */
    paginationColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否循环轮播
     */
    loop: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 动画时长（单位是ms）
     */
    duration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 自动轮播时长，0表示不会自动轮播
     */
    autoPlay: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否自动播放
     */
    isAutoPlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 初始化索引值
     */
    initPage: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否可触摸滑动
     */
    touchable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 滑动过程中是否禁用默认事件
     */
    isPreventDefault: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 滑动过程中是否禁止冒泡
     */
    isStopPropagation: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 轮播列表数据
     */
    list: {
        type: ArrayConstructor;
        default: () => never[];
    };
    /**
     * @description 分页指示器没有选中的颜色
     */
    paginationUnselectedColor: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SwiperProps = ExtractPropTypes<typeof swiperProps>;
declare const swiperEmits: {
    change: (val: number) => boolean;
};
type SwiperEmits = typeof swiperEmits;
declare const SWIPER_KEY: unique symbol;
interface SwiperInst {
    /**
     * @description 切换到上一页
     */
    prev: () => void;
    /**
     * @description 切换到下一页
     */
    next: () => void;
    /**
     * @description 切换到指定轮播
     * @param index
     * @returns
     */
    to: (index: number) => void;
}

declare const swiperItemProps: {
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SwiperItemProps = ExtractPropTypes<typeof swiperItemProps>;
interface SwiperItemInst {
    setOffset: (offset: number) => void;
}

declare const switchProps: {
    /**
     * @description 开关状态
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 禁用状态
     * @deprecated 即将弃用，请使用`disabled`
     */
    disable: BooleanConstructor;
    /**
     * @description 禁用状态
     */
    disabled: BooleanConstructor;
    /**
     * @description 打开时的背景颜色
     */
    activeColor: StringConstructor;
    /**
     * @description 关闭时的背景颜色
     */
    inactiveColor: StringConstructor;
    /**
     * @description 打开时文字描述
     */
    activeText: StringConstructor;
    /**
     * @description 关闭时文字描述
     */
    inactiveText: StringConstructor;
    /**
     * @description 打开时组件的值
     */
    activeValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 关闭组件的值
     */
    inactiveValue: {
        type: (NumberConstructor | StringConstructor | BooleanConstructor)[];
        default: boolean;
    };
    /**
     * @description 加载状态
     */
    loading: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type SwitchProps = ExtractPropTypes<typeof switchProps>;
declare const switchEmits: {
    "update:modelValue": (val: any) => val is string | number | boolean;
    change: (val: any, evt?: Event) => boolean;
};
type SwitchEmits = typeof switchEmits;

interface TabbarContext {
    modelValue: number | string;
    activeColor: string | undefined;
    unactiveColor: string | undefined;
    children: any[];
    changeIndex: (index: number, active: number | string) => void;
}

declare const tabbarProps: {
    /**
     * @description 选中标签的索引值或者名称
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否固定在页面底部
     */
    bottom: BooleanConstructor;
    /**
     * @description icon激活的颜色
     */
    activeColor: StringConstructor;
    /**
     * @description icon未激活的颜色
     */
    unactiveColor: StringConstructor;
    /**
     * @description 是否开启iphone系列全面屏底部安全区适配
     */
    safeAreaInsetBottom: BooleanConstructor;
    /**
     * @description 固定在底部时，是否在标签位置生成一个等高的占位元素
     */
    placeholder: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TabBarProps = ExtractPropTypes<typeof tabbarProps>;
declare const tabbarEmits: {
    tabSwitch: (val: any, index: number | string) => boolean;
    "update:modelValue": (val: string | number) => boolean;
};
type TabBarEmits = typeof tabbarEmits;
declare const TABBAR_CONTEXT_KEY: InjectionKey<TabbarContext>;

declare const tabbaritemProps: {
    /**
     * @description 标签名称，作为匹配的标识符
     */
    name: StringConstructor;
    /**
     * @description 标签页显示的图标
     */
    icon: StringConstructor;
    /**
     * @description 标签页的标题
     */
    tabTitle: StringConstructor;
    value: (NumberConstructor | StringConstructor)[];
    max: {
        type: NumberConstructor;
        default: number;
    };
    dot: BooleanConstructor;
    bubble: BooleanConstructor;
    hidden: BooleanConstructor;
    top: {
        type: vue.PropType<string>;
        default: string;
    };
    right: {
        type: vue.PropType<string>;
        default: string;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    customColor: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TabBarItemProps = ExtractPropTypes<typeof tabbaritemProps>;

interface TableColumnProps {
    /**
     * @description 列的唯一标识
     */
    key?: string;
    /**
     * @description 表头标题
     */
    title?: string;
    /**
     * @description 列的对齐方式，可选值`left`,`center`
     */
    align?: 'left' | 'right';
    /**
     * @description 表头样式
     */
    stylehead?: string;
    /**
     * @description 表格列样式
     */
    stylecolumn?: string;
    /**
     * @description 排序，可选值有 `true`,`function`, `default`, 其中 `default`表示点击之后可能会依赖接口, `function`可以返回具体的排序函数, `default`表示采用默认的排序算法
     * @param row1
     * @param row2
     * @returns
     */
    sorter?: (row1: any, row2: any) => number;
    /**
     * @description 自定义渲染列数据，优先级高,仅支持`H5`
     * @param rowData
     * @param rowIndex
     * @returns
     */
    render?: (rowData?: object, rowIndex?: number) => VNodeChild | string | VNode;
}

declare const tableProps: {
    /**
     * @description 是否显示边框
     */
    bordered: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 表头数据
     */
    columns: {
        type: vue.PropType<TableColumnProps[]>;
        default: () => TableColumnProps[];
    };
    /**
     * @description 表格数据
     */
    data: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否显示简介
     */
    summary: {
        type: FunctionConstructor;
        default: null;
    };
    /**
     * @description 条纹是否明暗交替
     */
    striped: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TableProps = ExtractPropTypes<typeof tableProps>;
declare const tableEmits: {
    sorter: (val: TableColumnProps) => boolean;
};
type TableEmits = typeof tableEmits;

declare const tabpaneProps: {
    /**
     * @description 标题
     */
    title: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 标签 Key, 匹配的标识符
     */
    paneKey: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 是否禁用标签
     */
    disabled: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TabPaneProps = ExtractPropTypes<typeof tabpaneProps>;
declare const tabpaneEmits: {
    click: () => boolean;
};
type TabPaneEmits = typeof tabpaneEmits;

declare const TAB_KEY: unique symbol;
declare const tabsProps: {
    /**
     * @description 绑定当前选中标签的标识符
     */
    modelValue: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 标签选中色
     */
    customColor: StringConstructor;
    /**
     * @description 使用横纵方向,可选值`horizontal`、`vertical`
     */
    direction: {
        type: vue.PropType<"horizontal" | "vertical">;
        default: "horizontal" | "vertical";
    };
    /**
     * @description 标签栏字体尺寸大小,可选值`large` `normal` `small`
     */
    size: {
        type: vue.PropType<"normal" | "large" | "small">;
        default: "normal" | "large" | "small";
    };
    /**
     * @description 选中底部展示样式,可选值 `line`、`smile`
     */
    type: {
        type: vue.PropType<"line" | "card" | "smile">;
        default: "line" | "card" | "smile";
    };
    /**
     * @description 标签栏是否可以滚动
     */
    titleScroll: BooleanConstructor;
    /**
     * @description 是否省略过长的标题文字
     */
    ellipsis: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否开启手势左右滑动切换
     */
    swipeable: BooleanConstructor;
    /**
     * @description 自动高度。设置为 true 时，nut-tabs 和 nut-tabs__content 会随着当前 nut-tab-pane 的高度而发生变化,使用此属性时必须设置nut-tabs的`pane-key`
     */
    autoHeight: BooleanConstructor;
    /**
     * @description 标签栏背景颜色
     */
    background: StringConstructor;
    /**
     * @description 切换动画时长，单位 ms。0 代表无动画，此时必须设置 pane-key
     */
    animatedTime: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 标签间隙
     */
    titleGutter: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 横轴方向的标题对齐方式，可选值 left、center
     */
    align: {
        type: vue.PropType<"left" | "center">;
        default: "left" | "center";
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TabsProps = ExtractPropTypes<typeof tabsProps>;
declare const tabsEmits: {
    click: (val: Title) => boolean;
    change: (val: Title) => boolean;
    "update:modelValue": (val: string) => boolean;
};
type TabsEmits = typeof tabsEmits;
declare class Title {
    title: string;
    titleSlot?: VNode<RendererNode, RendererElement, {
        [key: string]: any;
    }>;
    paneKey: string;
    disabled: boolean;
    constructor();
}

declare const tagProps: {
    /**
     * @description 标签颜色
     */
    customColor: StringConstructor;
    /**
     * @description 文本颜色，优先级高于 color 属性
     */
    textColor: StringConstructor;
    /**
     * @description 标签类型，可选值为 primary、success、danger、warning
     */
    type: {
        type: vue.PropType<"default" | "primary" | "success" | "warning" | "danger">;
        default: "default" | "primary" | "success" | "warning" | "danger";
    };
    /**
     * @description 是否为空心样式
     */
    plain: BooleanConstructor;
    /**
     * @description 是否为圆角样式
     */
    round: BooleanConstructor;
    /**
     * @description 是否为标记样式
     */
    mark: BooleanConstructor;
    /**
     * @description 是否为可关闭标签
     */
    closeable: BooleanConstructor;
    /**
     * @description 关闭图标大小
     */
    closeIconSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否禁用
     */
    disabled: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TagProps = ExtractPropTypes<typeof tagProps>;
declare const tagEmits: {
    click: (evt: any) => boolean;
    close: (evt: any) => boolean;
};
type TagEmits = typeof tagEmits;

declare const tagType: readonly ["primary", "success", "danger", "warning", "default"];
type TagType = (typeof tagType)[number];

interface TextareaAutosizeObject {
    /**
     * 最大高度
     */
    maxHeight?: number | string;
    /**
     * 最小高度
     */
    minHeight?: number | string;
}
declare const textareaConfirmType: readonly ["send", "search", "next", "go", "done", "return"];
type TextareaConfirmType = (typeof textareaConfirmType)[number];
declare const textareaAdjustKeyboardTo: string[];
type TextareaAdjustKeyboardTo = (typeof textareaAdjustKeyboardTo)[number];

declare const textareaProps: {
    /**
     * @description 输入值，支持双向绑定
     */
    modelValue: StringConstructor;
    /**
     * @description 文本位置,可选值left,center,right
     */
    textAlign: PropType<InputAlignType>;
    /**
     * @description textarea是否展示输入字符。须配合max-length使用
     */
    limitShow: BooleanConstructor;
    /**
     * @description 限制最长输入字符
     */
    maxLength: (NumberConstructor | StringConstructor)[];
    /**
     * @description textarea的高度，优先级高于autosize属性 仅支持 H5
     */
    rows: (NumberConstructor | StringConstructor)[];
    /**
     * @description 文本域自定义类名
     */
    textareaClass: {
        type: PropType<ClassType>;
        default: string;
    };
    /**
     * @description 文本域自定义样式
     */
    textareaStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
    /**
     * @description 设置占位提示文字
     */
    placeholder: StringConstructor;
    /**
     * @description 指定 placeholder 的样式
     */
    placeholderStyle: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 指定 placeholder 的样式类
     */
    placeholderClass: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 只读属性
     */
    readonly: BooleanConstructor;
    /**
     * @description 禁用属性
     */
    disabled: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 是否自适应内容高度，也可传入对象
     */
    autosize: {
        type: PropType<boolean | TextareaAutosizeObject>;
        default: boolean;
    };
    /**
     * @description 自动获取焦点
     */
    autofocus: BooleanConstructor;
    /**
     * @description 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离
     */
    cursorSpacing: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 指定focus时的光标位置
     */
    cursor: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否显示键盘上方带有”完成“按钮那一栏
     */
    showConfirmBar: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 光标起始位置，自动聚集时有效，需与selection-end搭配使用
     */
    selectionStart: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 光标结束位置，自动聚集时有效，需与selection-start搭配使用
     */
    selectionEnd: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 键盘弹起时，是否自动上推页面
     */
    adjustPosition: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description focus时，点击页面的时候不收起键盘
     */
    holdKeyboard: BooleanConstructor;
    /**
     * @description 是否去掉 iOS 下的默认内边距
     */
    disableDefaultPadding: BooleanConstructor;
    /**
     * @description 设置键盘右下角按钮的文字，可选值 `send` `search` `next` `go` `done` `return`
     */
    confirmType: {
        type: PropType<"search" | "done" | "next" | "send" | "go" | "return">;
        default: "search" | "done" | "next" | "send" | "go" | "return";
    };
    /**
     * @description 点击键盘右下角按钮时是否保持键盘不收起
     */
    confirmHold: BooleanConstructor;
    /**
     * @description 键盘对齐位置，可选值 `cursor` `bottom`
     */
    adjustKeyboardTo: {
        type: PropType<string>;
        default: string;
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<StyleValue>;
        default: string;
    };
};
type TextareaProps = ExtractPropTypes<typeof textareaProps>;
declare const textareaEmits: {
    blur: (evt: TextareaOnBlurEvent) => boolean;
    focus: (evt: TextareaOnFocusEvent) => boolean;
    change: (val1?: string, val2?: string | Event) => boolean;
    "update:modelValue": (val1?: string, val2?: string | Event) => boolean;
    confirm: (evt: TextareaOnConfirmEvent) => boolean;
    input: (val: string, evt: TextareaOnInputEvent) => boolean;
};
type TextareaEmits = typeof textareaEmits;

declare const timedetailProps: {
    /**
     * @description 可选择的时间，数组元素同 `current-time`
     */
    times: {
        type: vue.PropType<any[]>;
        default: () => any[];
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TimeDetailProps = ExtractPropTypes<typeof timedetailProps>;
declare const timedetailEmits: {
    select: (time: string) => boolean;
};
type TimeDetailEmits = typeof timedetailEmits;

declare const timepannelProps: {
    /**
     * @description 显示的名称
     */
    name: StringConstructor;
    /**
     * @description 唯一标识，和 current-key一起标识当前选择的天
     */
    pannelKey: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TimePannelProps = ExtractPropTypes<typeof timepannelProps>;
declare const timepannelEmits: {
    change: (pannelKey: number | string) => boolean;
};
type TimePannelEmits = typeof timepannelEmits;

declare const timeselectProps: {
    /**
     * @description 是否显示弹层
     */
    visible: BooleanConstructor;
    /**
     * @description 弹层的高度
     */
    height: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 弹层标题
     */
    title: StringConstructor;
    /**
     * @description 唯一标识
     */
    currentKey: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 当前选择的时间，数组元素包含:key: string; list: string[]
     */
    currentTime: {
        type: vue.PropType<{
            key: string;
            list: string[];
        }[]>;
        default: () => {
            key: string;
            list: string[];
        }[];
    };
    /**
     * @description 背景是否锁定
     */
    lockScroll: {
        type: BooleanConstructor;
        default: true;
    };
    muti: BooleanConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TimeSelectProps = ExtractPropTypes<typeof timeselectProps>;
declare const timeselectEmits: {
    "update:visible": (val: boolean) => boolean;
    select: (val: any) => boolean;
};
type TimeSelectEmits = typeof timeselectEmits;

declare const toastType: readonly ["text", "success", "error", "warning", "loading"];
type ToastType = (typeof toastType)[number];
declare const toastSize: readonly ["small", "base", "large"];
type ToastSize = (typeof toastSize)[number];
interface ToastOptions {
    /**
     * @description 是否显示
     */
    visible?: boolean;
    /**
     * @description 弹框类型，可选值（text、success、error、warning、loading）
     */
    type?: ToastType;
    /**
     * @description 标题
     */
    title?: string;
    /**
     * @description 消息文本内容，支持传入HTML
     */
    msg?: string;
    /**
     * @description 展示时长（单位：ms）
     * - 值为0时toast不会自动关闭
     * - 组合式函数用法/Ref用法中，loading类型默认为0
     */
    duration?: number;
    /**
     * @description 文案尺寸，可选值（small、base、large）
     */
    size?: ToastSize;
    /**
     * @description 组件z-index
     */
    zIndex?: number;
    /**
     * @description 自定义图标
     */
    icon?: string;
    /**
     * @description 图标大小
     */
    iconSize?: string | number;
    /**
     * @description 背景颜色
     */
    bgColor?: string;
    /**
     * @description 是否显示遮罩层
     * - 组合式函数用法/Ref用法中，loading类型默认为true
     */
    cover?: boolean;
    /**
     * @description 遮罩层颜色，默认透明
     */
    coverColor?: string;
    /**
     * @description 是否展示在页面中部（为false时展示在底部）
     */
    center?: boolean;
    /**
     * @description 距页面底部的距离（center为false时生效）
     */
    bottom?: string | number;
    /**
     * @description 文案是否居中
     */
    textAlignCenter?: boolean;
    /**
     * @description loading图标是否旋转（仅对loading类型生效）
     */
    loadingRotate?: boolean;
    /**
     * @description 是否在点击遮罩层后关闭提示
     */
    closeOnClickOverlay?: boolean;
    /**
     * @description 关闭时触发的事件
     */
    onClose?: Function;
    /**
     * @description 关闭动画完成时触发的事件
     */
    onClosed?: Function;
}
interface ToastInst {
    /**
     * @deprecated 使用`text`、`success`、`error`、`warning`、`loading`代替
     * @description 显示提示
     */
    showToast: {
        text: (msg: string, options?: ToastOptions) => void;
        success: (msg: string, options?: ToastOptions) => void;
        fail: (msg: string, options?: ToastOptions) => void;
        warn: (msg: string, options?: ToastOptions) => void;
        loading: (msg: string, options?: ToastOptions) => void;
    };
    /**
     * @deprecated 使用`hide`代替
     * @description 隐藏提示
     */
    hideToast: () => void;
    /**
     * @description 文字提示
     */
    text: (msg: string, options?: ToastOptions) => void;
    /**
     * @description 成功提示
     */
    success: (msg: string, options?: ToastOptions) => void;
    /**
     * @description 错误提示
     */
    error: (msg: string, options?: ToastOptions) => void;
    /**
     * @description 警告提示
     */
    warning: (msg: string, options?: ToastOptions) => void;
    /**
     * @description 加载提示
     */
    loading: (msg: string, options?: ToastOptions) => void;
    /**
     * @description 隐藏提示
     */
    hide: () => void;
}

declare const toastDefaultOptionsKey = "__TOAST_OPTIONS__";
declare const toastDefaultOptions: Required<Pick<ToastOptions, 'visible' | 'type' | 'msg' | 'duration' | 'size' | 'zIndex' | 'iconSize' | 'center' | 'bottom' | 'textAlignCenter' | 'loadingRotate'>>;
declare const toastProps: {
    /**
     * @description 是否显示
     */
    visible: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 配置注入的key
     */
    selector: StringConstructor;
    /**
     * @description 弹框类型，可选值（text、success、error、warning、loading）
     */
    type: {
        type: vue.PropType<"text" | "loading" | "success" | "warning" | "error">;
        default: "text" | "loading" | "success" | "warning" | "error";
    };
    /**
     * @description 标题
     */
    title: StringConstructor;
    /**
     * @description 消息文本内容，支持传入HTML
     */
    msg: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 展示时长（单位：ms）
     * - 值为0时toast不会自动关闭
     * - 组合式函数用法/Ref用法中，loading类型默认为0
     */
    duration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 文案尺寸，可选值（small、base、large）
     */
    size: {
        type: vue.PropType<"large" | "small" | "base">;
        default: "large" | "small" | "base";
    };
    /**
     * @description 组件z-index
     */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 自定义图标
     */
    icon: StringConstructor;
    /**
     * @description 图标大小
     */
    iconSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: string | number;
    };
    /**
     * @description 背景颜色
     */
    bgColor: StringConstructor;
    /**
     * @description 是否显示遮罩层
     * - 组合式函数用法/Ref用法中，loading类型默认为true
     */
    cover: BooleanConstructor;
    /**
     * @description 遮罩层颜色，默认透明
     */
    coverColor: StringConstructor;
    /**
     * @description 是否展示在页面中部（为false时展示在底部）
     */
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 距页面底部的距离（center为false时生效）
     */
    bottom: {
        type: (NumberConstructor | StringConstructor)[];
        default: string | number;
    };
    /**
     * @description 文案是否居中
     */
    textAlignCenter: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description loading图标是否旋转（仅对loading类型生效）
     */
    loadingRotate: {
        type: BooleanConstructor;
        default: boolean;
    };
    /**
     * @description 是否在点击遮罩层后关闭提示
     */
    closeOnClickOverlay: BooleanConstructor;
    /**
     * @description 关闭时触发的事件
     */
    onClose: FunctionConstructor;
    /**
     * @description 关闭动画完成时触发的事件
     */
    onClosed: FunctionConstructor;
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type ToastProps = ExtractPropTypes<typeof toastProps>;
declare const toastEmits: {
    "update:visible": (visible: boolean) => boolean;
    close: () => boolean;
    closed: () => boolean;
};
type ToastEmits = typeof toastEmits;

interface StepOptions {
    target: string;
    content?: string;
    location?: PopoverLocation;
    popoverOffset?: number[];
    arrowOffset?: number;
}
declare const tourProps: {
    /**
     * @description 是否展示引导弹出层
     */
    modelValue: BooleanConstructor;
    /**
     * @description 引导类型
     * - 默认值为 'step'
     */
    type: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 引导步骤内容
     * - 类型为 `StepOptions[]`
     * - 默认
     */
    steps: {
        type: vue.PropType<StepOptions[]>;
        default: () => StepOptions[];
    };
    /**
     * @description 弹出层位置,同 Popopver 的location 属性
     * - 默认值为 `'bottom'`
     */
    location: {
        type: vue.PropType<"left" | "right" | "bottom" | "top" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end">;
        default: "left" | "right" | "bottom" | "top" | "top-start" | "top-end" | "bottom-start" | "bottom-end" | "left-start" | "left-end" | "right-start" | "right-end";
    };
    /**
     * @description 类型为 `step` 时，默认展示第几步
     * - 默认值为 `0`
     */
    current: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 下一步按钮文案
     * - 默认值为 `'下一步'`
     */
    nextStepTxt: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 上一步按钮文案
     * - 默认值为 `'上一步'`
     */
    prevStepTxt: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 完成按钮文案
     * - 默认值为 `'完成'`
     */
    completeTxt: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 是否显示镂空遮罩
     * - 默认值为 `true`
     */
    mask: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 镂空遮罩相对于目标元素的偏移量
     * - 默认值为 `[8, 10]`
     */
    offset: {
        type: vue.PropType<number[]>;
        default: () => number[];
    };
    /**
     * @description 自定义背景色
     * - 默认值为 `''`
     */
    bgColor: StringConstructor;
    /**
     * @description 气泡遮罩层主题,同 Popopver 的theme 属性
     */
    theme: {
        type: vue.PropType<PopoverTheme>;
        default: PopoverTheme;
    };
    /**
     * @description 镂空遮罩层宽度
     */
    maskWidth: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 镂空遮罩层高度
     */
    maskHeight: {
        type: (NumberConstructor | StringConstructor)[];
        default: string;
    };
    /**
     * @description 是否在点击镂空遮罩层后关闭,同 Popopver 的closeOnClickOverlay 属性
     */
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否展示上一步按钮
     */
    showPrevStep: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否展示标题栏
     */
    showTitleBar: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TourProps = ExtractPropTypes<typeof tourProps>;
declare const tourEmits: {
    "update:modelValue": (val: boolean) => boolean;
    close: (val: number) => boolean;
    change: (val: number) => boolean;
};
type TourEmits = typeof tourEmits;

declare const trendarrowProps: {
    /**
     * @description 数值，大于0时箭头向上，小于0时箭头向下
     * - 类型为 `number`
     * - 默认值为 `0`
     */
    rate: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 小数位精度
     * - 类型为 `number`
     * - 默认值为 `2`
     */
    digits: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 是否显示加减号
     * - 类型为 `boolean`
     * - 默认值为 `false`
     */
    showSign: BooleanConstructor;
    /**
     * @description 是否显示 0
     * - 类型为 `boolean`
     * - 默认值为 `false`
     */
    showZero: BooleanConstructor;
    /**
     * @description 是否在数字左侧显示箭头
     * - 类型为 `boolean`
     * - 默认值为 `false`
     */
    arrowLeft: BooleanConstructor;
    /**
     * @description 文字颜色是否与箭头同步
     * - 类型为 `boolean`
     * - 默认值为 `true`
     */
    syncTextColor: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 文字颜色
     * - 类型为 `string`
     * - 默认值为 `'#333'`
     */
    textColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 向上箭头颜色
     * - 类型为 `string`
     * - 默认值为 `'#fa2c19'`
     */
    riseColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 向下箭头颜色
     * - 类型为 `string`
     * - 默认值为 `'#64b578'`
     */
    dropColor: {
        type: vue.PropType<string>;
        default: string;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TrendArrowProps = ExtractPropTypes<typeof trendarrowProps>;

declare const turntableProps: {
    /**
     * @description 转盘的宽度
     */
    width: {
        required: boolean;
        default: string;
    };
    /**
     * @description 转盘的高度
     */
    height: {
        required: boolean;
        default: string;
    };
    /**
     * 奖品列表
     */
    prizeList: {
        type: {
            (arrayLength: number): any[];
            (...items: any[]): any[];
            new (arrayLength: number): any[];
            new (...items: any[]): any[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        };
        required: boolean;
        default: () => never[];
    };
    /**
     * 中奖奖品在列表的索引位置
     */
    prizeIndex: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 从开始转动到结束所用时间,单位秒
     */
    turnsNumber: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 转盘中的样式，包括每个扇区的背景颜色(在每条数据中页可单独设置 prizeColor)，扇区的边框颜色
     */
    styleOpt: {
        default: () => {
            prizeBgColors: string[];
            borderColor: string;
        };
    };
    /**
     * @description 转动需要持续的时间(秒)
     */
    turnsTime: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 抽奖间隔(秒)
     */
    lockTime: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 转盘中指针的样式，包括背景图片、大小等
     */
    pointerStyle: {
        default: () => {
            width: string;
            height: string;
            backgroundImage: string;
            backgroundSize: string;
            backgroundRepeat: string;
        };
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type TurnTableProps = ExtractPropTypes<typeof turntableProps>;
declare const turntableEmits: {
    click: () => boolean;
    startTurns: () => boolean;
    endTurns: () => boolean;
    lockTurns: () => boolean;
};
type TurnTableEmits = typeof turntableEmits;
interface TurnTableInst {
    rotateTurn: () => void;
}

interface TPrizeItem {
    id: string | number;
    prizeName: string;
    prizeColor: string;
    prizeImg: string;
}

type SizeType = 'original' | 'compressed';
type SourceType = 'album' | 'camera';
type AcceptType = 'image' | 'media' | 'video' | 'all';
type MediaType = 'image' | 'video' | 'mix';
type FileType = 'image' | 'video' | 'audio';
type FileItemStatus = 'ready' | 'uploading' | 'success' | 'error';
interface FileItem {
    status: FileItemStatus;
    message: string;
    uid?: string;
    name: string;
    url?: string;
    type?: FileType;
    path?: string;
    percentage?: string | number;
    formData?: any;
}

interface ChooseFile {
    size: number;
    type?: FileType;
    fileType?: FileType;
    originalFileObj?: any;
    tempFilePath?: string;
    thumbTempFilePath?: string;
    path?: string;
    name: string;
    thumb?: string;
    url?: string;
    [k: string]: unknown;
}
interface ChooseFileOptions {
    accept: AcceptType;
    multiple: boolean;
    capture: boolean;
    maxDuration: number;
    sizeType: SizeType[];
    camera?: 'back' | 'front';
    maxCount: number;
}
declare function chooseFile({ accept, multiple, maxDuration, sizeType, camera, }: ChooseFileOptions, props: UploaderProps, fileList: any[]): Promise<ChooseFile[] | ChooseFile>;
type OnProgressUpdateResult = UniApp.OnProgressUpdateResult;
type UploadFileSuccessCallbackResult = UniApp.UploadFileSuccessCallbackResult;
type GeneralCallbackResult = UniApp.GeneralCallbackResult;
type UploadOptions = UniNamespace.UploadFileOption & {
    xhrState?: number;
    onStart?: (option: UploadOptions) => void;
    onProgress?: (result: UniApp.OnProgressUpdateResult, option: UploadOptions) => void;
    onSuccess?: (result: UniApp.UploadFileSuccessCallbackResult, option: UploadOptions) => void;
    onFailure?: (result: UniApp.GeneralCallbackResult | UniApp.UploadFileSuccessCallbackResult, option: UploadOptions) => void;
};
declare function createUploader(options: UploadOptions): {
    upload: () => void;
};

declare const uploaderProps: {
    /**
     * @description 发到后台的文件参数名
     * - 类型为 `string`
     * - 默认值为 `'file'`
     */
    name: {
        type: PropType<string>;
        default: string;
    };
    /**
     * @description 上传服务器的接口地址
     */
    url: StringConstructor;
    /**
     * @description 选择文件的来源
     * - 类型为 `Array<SourceType>`
     * - 默认值为 `['album', 'camera']`
     */
    sourceType: {
        type: PropType<SourceType[]>;
        default: () => SourceType[];
    };
    /**
     * @description 选择文件类型
     * - 类型为 `Array<MediaType>`
     * - 默认值为 `['image', 'video', 'mix']`
     */
    mediaType: {
        type: PropType<MediaType[]>;
        default: () => MediaType[];
    };
    /**
     * @description 超时时间，单位为毫秒
     * - 类型为 `number | string`
     * - 默认值为 `1000 * 30`
     */
    timeout: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 默认已经上传的文件列表
     */
    fileList: {
        type: PropType<any[]>;
        default: () => any[];
    };
    /**
     * @description 是否上传成功后展示预览图
     * - 类型为 `boolean`
     * - 默认值为 `true`
     */
    isPreview: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 上传列表的内建样式，支持两种基础样式 `picture`、`list`
     * - 类型为 `string`
     * - 默认值为 `'picture'`
     */
    listType: {
        type: PropType<"list" | "picture">;
        default: "list" | "picture";
    };
    /**
     * @description 是否展示删除按钮
     */
    isDeletable: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 上传请求的 http method
     * - 类型为 `string`
     * - 默认值为 `'post'`
     */
    method: {
        type: PropType<string>;
        default: string;
    };
    capture: BooleanConstructor;
    /**
     * @description 可以设定最大上传文件的大小（字节）
     */
    maximize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 最多可以选择的文件个数，微信基础库2.25.0前，最多可支持9个文件，2.25.0及以后最多可支持20个文件
     */
    maximum: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    accept: {
        type: PropType<AcceptType>;
        default: AcceptType;
    };
    /**
     * @description 设置上传的请求头部
     */
    headers: {
        type: ObjectConstructor;
        default: {};
    };
    /**
     * @description 附加上传的信息 formData
     */
    data: {
        type: ObjectConstructor;
        default: {};
    };
    /**
     * @description 接口响应的成功状态（status）值
     */
    xhrState: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否支持文件多选
     */
    multiple: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 是否禁用文件上传
     */
    disabled: {
        type: PropType<boolean | undefined>;
        default: undefined;
    };
    /**
     * @description 是否在选取文件后立即进行上传，false 时需要手动执行ref的`submit`方法进行上传
     */
    autoUpload: {
        type: BooleanConstructor;
        default: true;
    };
    /**
     * @description 执行 `uni.uploadFile` 上传时，自定义方法
     */
    beforeUpload: {
        type: FunctionConstructor;
        default: null;
    };
    /**
     * @description 除文件时的回调，返回值为 false 时不移除。支持返回一个 Promise 对象，Promise 对象 resolve(false) 或 reject 时不移除
     */
    beforeDelete: {
        type: PropType<Interceptor>;
        default: null;
    };
    /**
     * @description 当accept为video时生效，是否压缩视频，默认为true（默认 true ）
     * - compressed: { type: Boolean, default: true },
     * - 当accept为video时生效，拍摄视频最长拍摄时间，单位秒（默认 60 ）
     */
    maxDuration: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 所选的图片的尺寸, 可选值为original compressed
     */
    sizeType: {
        type: PropType<SizeType[]>;
        default: () => SizeType[];
    };
    /**
     * 当accept为video时生效，可选值为back或front
     */
    camera: {
        type: PropType<"back" | "front" | undefined>;
        default: "back" | "front" | undefined;
    };
    /**
     * @description 预览图片的 mode 属性
     */
    mode: {
        type: PropType<"left" | "right" | "center" | "bottom" | "top" | "aspectFit" | "scaleToFill" | "aspectFill" | "widthFix" | "heightFix" | "top left" | "top right" | "bottom left" | "bottom right">;
        default: "left" | "right" | "center" | "bottom" | "top" | "aspectFit" | "scaleToFill" | "aspectFill" | "widthFix" | "heightFix" | "top left" | "top right" | "bottom left" | "bottom right";
    };
    customClass: {
        type: PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: PropType<vue.StyleValue>;
        default: string;
    };
};
type UploaderProps = ExtractPropTypes<typeof uploaderProps>;
declare const uploaderEmits: {
    start: (option: UploadOptions) => boolean;
    progress: (val: {
        event: any;
        option: UploadOptions;
        percentage: string | number;
    }) => boolean;
    'update:fileList': (val: FileItem[]) => boolean;
    oversize: (val: any[]) => boolean;
    success: (val: any) => boolean;
    failure: (err: any) => boolean;
    change: (val: {
        fileList: FileItem[];
        event?: any;
    }) => boolean;
    delete: (val: {
        file: FileItem;
        fileList: FileItem[];
        index: number;
    }) => boolean;
    fileItemClick: (val: any) => boolean;
};
type UploaderEmits = typeof uploaderEmits;
interface UploaderInst {
    /**
     * @description 手动上传模式，执行上传操作
     */
    submit: () => void;
    /**
     * @description 调用选择文件的方法，效果等同于点击 nut-uploader 组件
     */
    chooseImage: () => void;
    /**
     * @description 清空已选择的文件队列（该方法一般配合在手动模式上传时使用）
     * @param index
     * @returns
     */
    clearUploadQueue: (index: number) => void;
}

declare const watermarkProps: {
    /**
     * @description 水印的名称
     */
    name: StringConstructor;
    /**
     * @description 水印之间的垂直间距
     */
    gapY: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 水印之间的水平间距
     */
    gapX: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 追加的水印元素的z-index
     */
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 水印的宽度
     */
    width: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 水印的高度
     */
    height: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 水印绘制时，旋转的角度
     */
    rotate: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 图片源，建议导出 2 倍或 3 倍图，优先使用图片渲染水印
     */
    image: StringConstructor;
    /**
     * @description 图片宽度
     */
    imageWidth: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 图片高度
     */
    imageHeight: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description 水印文字内容
     */
    content: {
        type: (StringConstructor | {
            (arrayLength: number): string[];
            (...items: string[]): string[];
            new (arrayLength: number): string[];
            new (...items: string[]): string[];
            isArray(arg: any): arg is any[];
            readonly prototype: any[];
            from<T>(arrayLike: ArrayLike<T>): T[];
            from<T, U>(arrayLike: ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            from<T>(iterable: Iterable<T> | ArrayLike<T>): T[];
            from<T, U>(iterable: Iterable<T> | ArrayLike<T>, mapfn: (v: T, k: number) => U, thisArg?: any): U[];
            of<T>(...items: T[]): T[];
            fromAsync<T>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T | PromiseLike<T>> | ArrayLike<T | PromiseLike<T>>): Promise<T[]>;
            fromAsync<T, U>(iterableOrArrayLike: AsyncIterable<T> | Iterable<T> | ArrayLike<T>, mapFn: (value: Awaited<T>) => U, thisArg?: any): Promise<Awaited<U>[]>;
            readonly [Symbol.species]: ArrayConstructor;
        })[];
        default: string;
    };
    /**
     * @description 水印文字颜色
     */
    fontColor: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 水印文字样式
     */
    fontStyle: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 水印文字字体
     */
    fontFamily: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 水印文字粗细
     */
    fontWeight: {
        type: vue.PropType<string>;
        default: string;
    };
    /**
     * @description 水印文字大小
     */
    fontSize: {
        type: (NumberConstructor | StringConstructor)[];
        default: number;
    };
    /**
     * @description 是否覆盖整个页面
     */
    fullPage: {
        type: BooleanConstructor;
        default: true;
    };
    customClass: {
        type: vue.PropType<ClassType>;
        default: string;
    };
    customStyle: {
        type: vue.PropType<vue.StyleValue>;
        default: string;
    };
};
type WaterMarkProps = ExtractPropTypes<typeof watermarkProps>;
declare const watermarkEmits: {
    click: (val: Event) => boolean;
};
type WaterMarkEmits = typeof watermarkEmits;

declare function NutResolver(): ComponentResolver;

export { AVATAR_GROUP_KEY, type AcceptType, type ActionSheetOption, type ActionsheetEmits, type ActionsheetProps, type AddressEmits, type AddressExistRegionData, type AddressListEmits, type AddressListOptions, type AddressListProps, type AddressProps, type AddressRegionData, type AddressType, type AnimateEmits, type AnimateProps, type AvatarFinalSize, type AvatarGroupProps, type AvatarProps, type AvatarShape, type AvatarSize, type BacktopEmits, type BacktopProps, type BadgeProps, type BarrageInst, type BarrageProps, type ButtonEmits, type ButtonFormType, type ButtonProps, type ButtonShape, type ButtonSize, type ButtonType, CHECKBOX_KEY, type CalendarEmits, type CalendarItemEmits, type CalendarItemProps, type CalendarProps, type CardProps, type CascaderEmits, type CascaderItemEmits, type CascaderItemProps, type CascaderProps, type CategoryEmits, type CategoryPaneEmits, type CategoryPaneProps, type CategoryProps, type CategoryType, type CellEmits, type CellGroupProps, type CellProps, type CheckBoxInst, type CheckboxEmits, type CheckboxGroupEmits, type CheckboxGroupInst, type CheckboxGroupProps, type CheckboxProps, type ChildType, type ChooseFile, type ChooseFileOptions, type CircleProgressProps, type CodeInputEmits, type CodeInputProps, type ColProps, type CollapseEmits, type CollapseItemProps, type CollapseProps, type CommentEmits, type CommentProps, type ConfigProviderProps, type CountDownPropsProps, type CountUpEmits, type CountUpInst, type CountUpProps, type CountdownEmits, type CountdownInst, type CustomRegionData, type CustomType, type DateLike, type DatePickerBaseEvent, type DatePickerChangeEvent, type DatePickerColumnType, type DatePickerEmits, type DatePickerFilter, type DatePickerFormatter, type DatePickerProps, type DatePickerRangeItem, type DatePickerType, type DialogEmits, type DialogInst, type DialogOptions, type DialogProps, type DividerProps, type DollMachineEmits, type DollMachineProps, type DragProps, type ECardEmits, type ECardProps, type EcardChangeEvent, type EcardDataItem, type EcardDataValue, type EcardInst, type EcardUpdateOptions, type ElevatorData, type ElevatorEmits, type ElevatorInst, type ElevatorProps, type EllipsisEmits, type EllipsisProps, type EllipsisedValue, type EmptyProps, type ErrorMessage, FORM_KEY, type FileItem, type FileItemStatus, type FileType, type FixednavEmits, type FixednavProps, type FollowType, type FooterDirection, type FormEmits, type FormInst, type FormItemLabelPosition, type FormItemProps, type FormItemRule, FormItemRuleWithoutValidator, type FormItemStarPosition, type FormLabelPosition, type FormProps, type FormRule, type FormRules, type FormStarPosition, GRID_KEY, type GeneralCallbackResult, type GiftBoxEmits, type GiftBoxInst, type GridItemEmits, type GridItemProps, type GridProps, type HitEggsEmits, type HitEggsProps, type IClassNameProps, type IClassNames, type IData, type IconEmits, type IconProps, type ImagePreviewEmits, type ImagePreviewProps, type ImagesType, type IndicatorProps, type InfiniteLoadingEmits, type InfiniteLoadingProps, type InfoType, type InputAlignType, type InputConfirmType, type InputEmits, type InputFormatTrigger, type InputMode, type InputNumberEmits, type InputNumberProps, type InputProps, type InputTarget, type InputType, type InvoiceEmits, type InvoiceProps, type ListEmits, type ListProps, type LoadingPageProps, MENU_KEY, type MarqueeEmits, type MarqueeProps, type MediaType, type MenuItemInst, type MenuItemOption, type MenuItemProps, type MenuProps, type MenuitemEmits, type NavBarEmits, type NavBarProps, type NoticeBarEmits, type NoticeBarProps, type NotifyEmits, type NotifyInst, type NotifyOptions, type NotifyPosition, type NotifyProps, type NotifyType, type NumberKeyBoardEmits, type NumberKeyBoardProps, type NutAnimation, type NutAnimationName, type NutAnimations, type NutAnimationtimingFunction, NutResolver, type OnProgressUpdateResult, type OverlayEmits, type OverlayProps, type PaginationEmits, type PaginationProps, type PickerBaseEvent, type PickerChangeEvent, type PickerColumnEmits, type PickerColumnProps, type PickerColumnsType, type PickerEmits, type PickerFieldNames, type PickerOption, type PickerProps, type PickerTouchParams, type PopoverEmits, type PopoverList, type PopoverLocation, type PopoverProps, type PopoverRootPosition, type PopoverTheme, type PopupEmits, type PopupProps, type PriceProps, type ProgressProps, RADIO_KEY, type RadioGroupEmits, type RadioGroupProps, type RadioProps, type RangeArrayValue, type RangeEmits, type RangeProps, type RangeValue, type RateEmits, type RateProps, type RowProps, SIDEN_NAVBAR_KEY, SWIPER_KEY, type SafeAreaProps, type SearchbarEmits, type SearchbarProps, type SearchbarShape, type ShakeDiceEmits, type ShakeDiceInst, type ShakeDiceProps, type ShortPasswordEmits, type ShortPasswordProps, type SideNavbaritemEmits, type SideNavbaritemProps, type SidenavbarProps, type SignatureEmits, type SignatureProps, type SizeType, type SkeletonProps, type SkuEmits, type SkuProps, type SourceType, type StepEmits, type StepOptions, type StepProps, type StepsEmits, type StepsProps, type StickyProps, type SubSidenavbarEmits, type SubSidenavbarProps, type SwipeDirection, type SwipeEmits, type SwipeGroupProps, type SwipeInst, type SwipePosition, type SwipeProps, type SwipeToggleEvent, type SwiperEmits, type SwiperInst, type SwiperItemInst, type SwiperItemProps, type SwiperProps, type SwitchEmits, type SwitchProps, TABBAR_CONTEXT_KEY, TAB_KEY, type TPrizeItem, type TabBarEmits, type TabBarItemProps, type TabBarProps, type TabPaneEmits, type TabPaneProps, type TabbarContext, type TableColumnProps, type TableEmits, type TableProps, type TabsEmits, type TabsProps, type TagEmits, type TagProps, type TagType, type TextAlign, type TextareaAdjustKeyboardTo, type TextareaAutosizeObject, type TextareaConfirmType, type TextareaEmits, type TextareaProps, type TimeDetailEmits, type TimeDetailProps, type TimePannelEmits, type TimePannelProps, type TimeSelectEmits, type TimeSelectProps, Title, type ToastEmits, type ToastInst, type ToastOptions, type ToastProps, type ToastSize, type ToastType, type TourEmits, type TourProps, type TransitionEmits, type TransitionName, type TransitionProps, type TrendArrowProps, type TurnTableEmits, type TurnTableInst, type TurnTableProps, type UploadFileSuccessCallbackResult, type UploadOptions, type UploaderEmits, type UploaderInst, type UploaderProps, type VideosType, type WaterMarkEmits, type WaterMarkProps, actionsheetEmits, actionsheetProps, addressEmits, addressProps, addressType, addresslistEmits, addresslistProps, animateEmits, animateProps, avatarProps, avatarShape, avatarSize, avatargroupProps, backtopEmits, backtopProps, badgeProps, barrageProps, buttonEmits, buttonFormType, buttonProps, buttonShape, buttonSize, buttonType, calendarEmits, calendarProps, calendaritemEmits, calendaritemProps, cardProps, cascaderEmits, cascaderProps, cascaderitemEmits, cascaderitemProps, categoryEmits, categoryProps, categorypaneEmits, categorypaneProps, cellEmits, cellProps, cellgroupProps, checkboxEmits, checkboxProps, checkboxgroupEmits, checkboxgroupProps, chooseFile, circleprogressProps, clientHeight, codeinputEmits, codeinputProps, colProps, collapseEmits, collapseProps, collapseitemProps, commentEmits, commentProps, configProviderProps, countupEmits, countupProps, createUploader, datepickerColumnType, datepickerEmits, datepickerProps, datepickerType, defaultAnimations, dialogEmits, dialogProps, dividerProps, dollmachineEmits, dollmachineProps, dragProps, ecardEmits, ecardProps, elevatorEmits, elevatorProps, ellipsisEmits, ellipsisProps, emptyProps, fixednavEmits, fixednavProps, footerDirection, formEmits, formProps, formitemProps, getClassNames, giftboxEmits, gridItemEmits, gridItemProps, gridProps, hiteggsEmits, hiteggsProps, iconEmits, iconProps, imagepreviewEmits, imagepreviewProps, indicatorProps, infiniteloadingEmits, infiniteloadingProps, inputAlignType, inputConfirmType, inputEmits, inputFormatTrigger, inputMode, inputProps, inputType, inputnumberEmits, inputnumberProps, invoiceEmits, invoiceProps, isKeyOfAnimations, listEmits, listProps, loadingpageProps, marqueeEmits, marqueeProps, menuProps, menuitemEmits, menuitemProps, navbarEmits, navbarProps, noticebarEmits, noticebarProps, notifyDefaultOptions, notifyDefaultOptionsKey, notifyEmits, notifyPosition, notifyProps, notifyType, numberkeyboardEmits, numberkeyboardProps, nutAnimationName, nutAnimationtimingFunction, overlayEmits, overlayProps, paginationEmits, paginationProps, pickerColumnsType, pickerEmits, pickerProps, pickercolumnEmits, pickercolumnProps, popoverEmits, popoverLocation, popoverProps, popupEmits, popupProps, priceProps, progressProps, radioProps, radiogroupEmits, radiogroupProps, rangeEmits, rangeProps, rateEmits, rateProps, rowProps, safeareaProps, searchbarEmits, searchbarProps, searchbarShape, shakediceEmits, shakediceProps, shortpasswordEmits, shortpasswordProps, sidenavbarProps, sidenavbaritemEmits, sidenavbaritemProps, signatureEmits, signatureProps, skeletonProps, skuEmits, skuProps, type stateProps, stepEmits, stepProps, stepsEmits, stepsProps, stickyProps, subsidenavbarEmits, subsidenavbarProps, swipeDirection, swipeEmits, swipePosition, swipeProps, swipegroupProps, swiperEmits, swiperItemProps, swiperProps, switchEmits, switchProps, tabbarEmits, tabbarProps, tabbaritemProps, tableEmits, tableProps, tabpaneEmits, tabpaneProps, tabsEmits, tabsProps, tagEmits, tagProps, tagType, textAlign, textareaAdjustKeyboardTo, textareaConfirmType, textareaEmits, textareaProps, timedetailEmits, timedetailProps, timepannelEmits, timepannelProps, timeselectEmits, timeselectProps, toastDefaultOptions, toastDefaultOptionsKey, toastEmits, toastProps, toastSize, toastType, tourEmits, tourProps, transitionEmits, transitionProps, trendarrowProps, turntableEmits, turntableProps, uploaderEmits, uploaderProps, useDialog, useFormDisabled, usePopup, useTransition, watermarkEmits, watermarkProps };
