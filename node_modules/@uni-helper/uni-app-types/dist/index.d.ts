import { StyleValue, DefineComponent } from 'vue';

/** 组件的一些属性值集合 */
interface _EventTarget<Dataset extends Record<string, any> = Record<string, any>> {
    /** 事件源组件的id */
    id?: string;
    /** 当前组件的类型 */
    tagName?: string;
    /** 事件源组件上由 data- 开头的自定义属性组成的集合 */
    dataset?: Dataset;
    /** 距离页面顶部的偏移量 */
    offsetTop: number;
    /** 距离页面左边的偏移量 */
    offsetLeft: number;
    [key: string]: any;
}
/** 基础事件 */
interface _BaseEvent<Mark extends Record<string, any> = Record<string, any>, CurrentTargetDataset extends Record<string, any> = Record<string, any>, TargetDataset extends Record<string, any> = CurrentTargetDataset> {
    /** 事件类型 */
    type?: string;
    /** 事件生成时的时间戳 */
    timeStamp?: number;
    /** 事件冒泡路径上所有由 mark: 开头的自定义属性组成的集合 */
    mark?: Mark;
    /** 触发事件的源组件的一些属性值集合 */
    target?: _EventTarget<TargetDataset>;
    /** 事件绑定的当前组件的一些属性值集合 */
    currentTarget?: _EventTarget<CurrentTargetDataset>;
    [key: string]: any;
}
/** 自定义事件 */
interface _CustomEvent<Detail extends Record<string, any> = Record<string, any>, Mark extends Record<string, any> = Record<string, any>, CurrentTargetDataset extends Record<string, any> = Record<string, any>, TargetDataset extends Record<string, any> = CurrentTargetDataset> extends _BaseEvent<Mark, CurrentTargetDataset, TargetDataset> {
    /** 额外信息 */
    detail: Detail;
    [key: string]: any;
}
/** 当前停留在屏幕中的触摸点信息 */
interface _TouchDetail {
    /** 标志符 */
    identifier?: number;
    /** 距离文档左上角的横向距离 */
    pageX?: number;
    /** 距离文档左上角的纵向距离 */
    pageY?: number;
    /** 距离页面可显示区域（屏幕除去导航条）左上角的横向距离 */
    clientX?: number;
    /** 距离页面可显示区域（屏幕除去导航条）左上角的纵向距离 */
    clientY?: number;
}
/** 当前停留在 canvas 中的触摸点信息 */
interface _TouchCanvasDetail {
    /** 标志符 */
    identifier?: number;
    /** 距离 canvas 左上角的横向距离 */
    x?: number;
    /** 距离 canvas 左上角的纵向距离 */
    y?: number;
}
/** 触摸事件 */
interface _BaseTouchEvent<Detail extends Record<string, any> = Record<string, any>, T extends _TouchDetail | _TouchCanvasDetail = _TouchDetail, Mark extends Record<string, any> = Record<string, any>, CurrentTargetDataset extends Record<string, any> = Record<string, any>, TargetDataset extends Record<string, any> = CurrentTargetDataset> extends _CustomEvent<Detail, Mark, CurrentTargetDataset, TargetDataset> {
    /** 当前停留在屏幕中的触摸点信息的数组 */
    touches: T[];
    /** 当前变化的触摸点信息的数组 */
    changedTouches: T[];
}
/** 触摸事件响应 */
interface _TouchEvent<Detail extends Record<string, any> = Record<string, any>, Mark extends Record<string, any> = Record<string, any>, CurrentTargetDataset extends Record<string, any> = Record<string, any>, TargetDataset extends Record<string, any> = CurrentTargetDataset> extends _BaseTouchEvent<Detail, _TouchDetail, Mark, CurrentTargetDataset, TargetDataset> {
}
/** canvas 触摸事件响应 */
interface _TouchCanvasEvent<Mark extends Record<string, any> = Record<string, any>, TargetDataset extends Record<string, any> = Record<string, any>> extends _BaseTouchEvent<never, _TouchCanvasDetail, Mark, never, TargetDataset> {
    currentTarget: never;
}

declare global {
    namespace UniHelper {
        /** 组件的一些属性值集合 */
        interface EventTarget extends _EventTarget {
        }
        /** 基础事件 */
        interface BaseEvent extends _BaseEvent {
        }
        /** 自定义事件 */
        interface CustomEvent extends _CustomEvent {
        }
        /** 当前停留在屏幕中的触摸点信息 */
        interface TouchDetail extends _TouchDetail {
        }
        /** 当前停留在 canvas 中的触摸点信息 */
        interface TouchCanvasDetail extends _TouchCanvasDetail {
        }
        /** 触摸事件 */
        interface BaseTouchEvent extends _BaseTouchEvent {
        }
        /** 触摸事件响应 */
        interface TouchEvent extends _TouchEvent {
        }
        /** canvas 触摸事件响应 */
        interface TouchCanvasEvent extends _TouchCanvasEvent {
        }
    }
}

type CommonProps = {
    class?: any;
    style?: StyleValue;
};

/** 视图容器属性 */
type _ViewProps = CommonProps & Partial<{
    /**
     * 指定按下去的样式类
     *
     * 当 hover-class="none" 时，没有点击态效果
     *
     * 默认为 none
     */
    hoverClass: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     *
     * 默认为 false
     */
    hoverStopPropagation: boolean;
    /**
     * 按住后多久出现点击态
     *
     * 单位为毫秒
     *
     * 默认为 50
     */
    hoverStartTime: number;
    /**
     * 手指松开后点击态保留时间
     *
     * 单位为毫秒
     *
     * 默认为 400
     */
    hoverStayTime: number;
}>;
/**
 * 视图容器，和 div 类似，用于包裹各种元素内容
 *
 * 包裹文字建议使用 text
 *
 * 如果使用 div，会编译成 view
 */
type _View = DefineComponent<_ViewProps>;
/** 视图容器实例 */
type _ViewInstance = InstanceType<_View>;

declare global {
    namespace UniHelper {
        /** 视图容器属性 */
        type ViewProps = _ViewProps;
        /**
         * 视图容器，和 div 类似，用于包裹各种元素内容
         *
         * 包裹文字建议使用 text
         *
         * 如果使用 div，会编译成 view
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/view.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        type View = _View;
        /** 视图容器实例 */
        type ViewInstance = _ViewInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 视图容器，和 div 类似，用于包裹各种元素内容
         *
         * 包裹文字建议使用 text
         *
         * 如果使用 div，会编译成 view
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/view.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        view: _View;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 视图容器，和 div 类似，用于包裹各种元素内容
             *
             * 包裹文字建议使用 text
             *
             * 如果使用 div，会编译成 view
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/view.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            view: _View;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 视图容器，和 div 类似，用于包裹各种元素内容
             *
             * 包裹文字建议使用 text
             *
             * 如果使用 div，会编译成 view
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/view.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            view: _View;
        }
    }
}

/**
 * 设置自定义下拉刷新默认样式
 *
 * None 不使用默认样式
 */
type _ScrollViewRefresherDefaultStyle = "black" | "white" | "none";
type _ScrollViewOnScrolltoupperEvent = _BaseEvent;
/** 滚动到顶部/左边时触发 */
type _ScrollViewOnScrolltoupper = (event: _ScrollViewOnScrolltoupperEvent) => void;
type _ScrollViewOnScrolltolowerEvent = _BaseEvent;
/** 滚动到底部/右边时触发 */
type _ScrollViewOnScrolltolower = (event: _ScrollViewOnScrolltolowerEvent) => void;
interface _ScrollViewOnScrollDetail {
    scrollLeft: number;
    scrollTop: number;
    scrollHeight: number;
    scrollWidth: number;
    deltaX: number;
    deltaY: number;
}
type _ScrollViewOnScrollEvent = _CustomEvent<_ScrollViewOnScrollDetail>;
/** 滚动时触发 */
type _ScrollViewOnScroll = (event: _ScrollViewOnScrollEvent) => void;
type _ScrollViewOnRefresherpullingEvent = _BaseEvent;
/** 自定义下拉刷新控件被下拉时触发 */
type _ScrollViewOnRefresherpulling = (event: _ScrollViewOnRefresherpullingEvent) => void;
type _ScrollViewOnRefresherrefreshEvent = _BaseEvent;
/** 自定义下拉刷新被触发时触发 */
type _ScrollViewOnRefresherrefresh = (event: _ScrollViewOnRefresherrefreshEvent) => void;
type _ScrollViewOnRefresherrestoreEvent = _BaseEvent;
/** 自定义下拉刷新被复位时触发 */
type _ScrollViewOnRefresherrestore = (event: _ScrollViewOnRefresherrestoreEvent) => void;
type _ScrollViewOnRefresherabortEvent = _BaseEvent;
/** 自定义下拉刷新被中止时触发 */
type _ScrollViewOnRefresherabort = (event: _ScrollViewOnRefresherabortEvent) => void;
/** 可滚动视图区域属性 */
type _ScrollViewProps = CommonProps & Partial<{
    /**
     * 是否允许横向滚动
     *
     * 默认为 false
     */
    scrollX: boolean;
    /**
     * 是否允许纵向滚动
     *
     * 默认为 false
     */
    scrollY: boolean;
    /**
     * 距顶部/左边多远时触发 scrolltoupper 事件
     *
     * 单位为 px
     *
     * 默认为 50
     */
    upperThreshold: number | string;
    /**
     * 距底部/右边多远时触发 scrolltolower 事件
     *
     * 单位为 px
     *
     * 默认为 50
     */
    lowerThreshold: number | string;
    /**
     * 设置纵向滚动条位置
     *
     * 优先级低于 scroll-into-view
     */
    scrollTop: number | string;
    /**
     * 优先级低于 scroll-into-view
     *
     * @decs 设置横向滚动条位置
     */
    scrollLeft: number | string;
    /**
     * 值应为某子元素 id，id 不能以数字开头
     *
     * 设置哪个方向可滚动，则在哪个方向滚动到该元素
     *
     * 优先级高于 scroll-top / scroll-left
     */
    scrollIntoView: string;
    /**
     * 在设置滚动条位置时是否使用动画过渡
     *
     * 默认为 false
     */
    scrollWithAnimation: boolean;
    /**
     * 是否允许 iOS 点击顶部状态栏、安卓双击标题栏时，滚动条返回顶部
     *
     * 只支持纵向
     *
     * 默认为 false
     */
    enableBackToTop: boolean;
    /**
     * 控制是否出现滚动条
     *
     * 默认为 false
     */
    showScrollbar: boolean;
    /**
     * 是否开启自定义下拉刷新
     *
     * 默认为 false
     */
    refresherEnabled: boolean;
    /**
     * 设置自定义下拉刷新阈值
     *
     * 默认为 45
     */
    refresherThreshold: number;
    /**
     * 设置自定义下拉刷新默认样式
     *
     * None 不使用默认样式
     *
     * 默认为 black
     */
    refresherDefaultStyle: _ScrollViewRefresherDefaultStyle;
    /**
     * 自定义下拉刷新区域背景颜色
     *
     * 默认为 #FFF
     */
    refresherBackground: string;
    /**
     * 设置当前下拉刷新状态
     *
     * True 下拉刷新已经被触发
     *
     * False 下拉刷新未被触发
     *
     * 默认为 false
     */
    refresherTriggered: boolean;
    /**
     * 是否启用 flexbox 布局
     *
     * 开启后，当前节点声明了 display: flex 就会成为 flex container，并作用于其子节点
     *
     * 默认为 false
     */
    enableFlex: boolean;
    /**
     * 是否开启 scroll anchoring 特性，即控制滚动位置不随内容变化而抖动，仅在 iOS 下生效
     *
     * 安卓下可参考 CSS overflow-anchor 属性
     *
     * 默认为 false
     */
    scrollAnchoring: boolean;
    /** 滚动到顶部/左边时触发 */
    onScrolltoupper: _ScrollViewOnScrolltoupper;
    /** 滚动到底部/右边时触发 */
    onScrolltolower: _ScrollViewOnScrolltolower;
    /** 滚动时触发 */
    onScroll: _ScrollViewOnScroll;
    /** 自定义下拉刷新控件被下拉时触发 */
    onRefresherpulling: _ScrollViewOnRefresherpulling;
    /** 自定义下拉刷新被触发时触发 */
    onRefresherrefresh: _ScrollViewOnRefresherrefresh;
    /** 自定义下拉刷新被复位时触发 */
    onRefresherrestore: _ScrollViewOnRefresherrestore;
    /** 自定义下拉刷新被中止时触发 */
    onRefresherabort: _ScrollViewOnRefresherabort;
}>;
/**
 * 可滚动视图区域，用于区域滚动
 *
 * 在 webview 渲染的页面中，区域滚动的性能不及页面滚动
 *
 * 纵向滚动时，需要给 scroll-view 一个固定高度，通过 css 设置 height
 *
 * 横向滚动时，需要给 scroll-view 添加 white-space: nowrap; 样式
 *
 * Scroll-view 是区域滚动，不会触发页面滚动，无法触发 pages.json
 * 配置的下拉刷新、页面触底onReachBottomDistance、titleNView 的 transparent 透明渐变
 */
type _ScrollView = DefineComponent<_ScrollViewProps>;
/** 可滚动视图区域实例 */
type _ScrollViewInstance = InstanceType<_ScrollView>;

declare global {
    namespace UniHelper {
        /**
         * 设置自定义下拉刷新默认样式
         *
         * None 不使用默认样式
         */
        type ScrollViewRefresherDefaultStyle = _ScrollViewRefresherDefaultStyle;
        type ScrollViewOnScrolltoupperEvent = _ScrollViewOnScrolltoupperEvent;
        /** 滚动到顶部/左边时触发 */
        interface ScrollViewOnScrolltoupper extends _ScrollViewOnScrolltoupper {
        }
        type ScrollViewOnScrolltolowerEvent = _ScrollViewOnScrolltolowerEvent;
        /** 滚动到底部/右边时触发 */
        interface ScrollViewOnScrolltolower extends _ScrollViewOnScrolltolower {
        }
        interface ScrollViewOnScrollDetail extends _ScrollViewOnScrollDetail {
        }
        type ScrollViewOnScrollEvent = _ScrollViewOnScrollEvent;
        /** 滚动时触发 */
        interface ScrollViewOnScroll extends _ScrollViewOnScroll {
        }
        type ScrollViewOnRefresherpullingEvent = _ScrollViewOnRefresherpullingEvent;
        /** 自定义下拉刷新控件被下拉时触发 */
        interface ScrollViewOnRefresherpulling extends _ScrollViewOnRefresherpulling {
        }
        type ScrollViewOnRefresherrefreshEvent = _ScrollViewOnRefresherrefreshEvent;
        /** 自定义下拉刷新被触发时触发 */
        interface ScrollViewOnRefresherrefresh extends _ScrollViewOnRefresherrefresh {
        }
        type ScrollViewOnRefresherrestoreEvent = _ScrollViewOnRefresherrestoreEvent;
        /** 自定义下拉刷新被复位时触发 */
        interface ScrollViewOnRefresherrestore extends _ScrollViewOnRefresherrestore {
        }
        type ScrollViewOnRefresherabortEvent = _ScrollViewOnRefresherabortEvent;
        /** 自定义下拉刷新被中止时触发 */
        interface ScrollViewOnRefresherabort extends _ScrollViewOnRefresherabort {
        }
        /** 可滚动视图区域属性 */
        type ScrollViewProps = _ScrollViewProps;
        /**
         * 可滚动视图区域，用于区域滚动
         *
         * 在 webview 渲染的页面中，区域滚动的性能不及页面滚动
         *
         * 纵向滚动时，需要给 scroll-view 一个固定高度，通过 css 设置 height
         *
         * 横向滚动时，需要给 scroll-view 添加 white-space: nowrap; 样式
         *
         * Scroll-view 是区域滚动，不会触发页面滚动，无法触发 pages.json 配置的下拉刷新、页面触底
         * onReachBottomDistance、titleNView 的 transparent 透明渐变
         */
        type ScrollView = _ScrollView;
        /** 可滚动视图区域实例 */
        type ScrollViewInstance = _ScrollViewInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 可滚动视图区域，用于区域滚动
         *
         * 在 webview 渲染的页面中，区域滚动的性能不及页面滚动
         *
         * 纵向滚动时，需要给 scroll-view 一个固定高度，通过 css 设置 height
         *
         * 横向滚动时，需要给 scroll-view 添加 white-space: nowrap; 样式
         *
         * Scroll-view 是区域滚动，不会触发页面滚动，无法触发 pages.json 配置的下拉刷新、页面触底
         * onReachBottomDistance、titleNView 的 transparent 透明渐变
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/scroll-view.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        ScrollView: _ScrollView;
    }
}

/**
 * 导致变更的原因
 *
 * Autoplay 自动播放
 *
 * Touch 用户滑动
 *
 * 空字符串 其它原因
 */
type _SwiperSource = "autoplay" | "touch" | "";
/** Swiper 切换动画类型 */
type _SwiperEasingFunction = "default" | "linear" | "easeInCubic" | "easeOutCubic" | "easeInOutCubic";
interface _SwiperOnChangeDetail {
    /** 当前所在滑块的下标 */
    current: number;
    /**
     * 导致变更的原因
     *
     * Autoplay 自动播放
     *
     * Touch 用户滑动
     *
     * 空字符串 其它原因
     */
    source: _SwiperSource;
}
type _SwiperOnChangeEvent = _CustomEvent<_SwiperOnChangeDetail>;
/** Current 改变时触发 */
type _SwiperOnChange = (event: _SwiperOnChangeEvent) => void;
interface _SwiperOnTransitionDetail {
    dx?: number;
    dy?: number;
}
type _SwiperOnTransitionEvent = _CustomEvent<_SwiperOnTransitionDetail>;
/** Swiper-item 位置改变时触发 */
type _SwiperOnTransition = (event: _SwiperOnTransitionEvent) => void;
interface _SwiperOnAnimationfinishDetail {
    /** 当前所在滑块的下标 */
    current: number;
    /**
     * 导致变更的原因
     *
     * Autoplay 自动播放
     *
     * Touch 用户滑动
     *
     * 空字符串其它原因
     */
    source: _SwiperSource;
}
type _SwiperOnAnimationfinishEvent = _CustomEvent<_SwiperOnAnimationfinishDetail>;
/** 动画结束时触发 */
type _SwiperOnAnimationfinish = (event: _SwiperOnAnimationfinishEvent) => void;
/** 滑块视图容器属性 */
type _SwiperProps = CommonProps & Partial<{
    /**
     * 是否显示面板指示点
     *
     * 默认为 false
     */
    indicatorDots: boolean;
    /**
     * 指示点颜色
     *
     * 默认为 rgba(0, 0, 0, 0.3)
     */
    indicatorColor: string;
    /**
     * 当前选中的指示点颜色
     *
     * 默认为 #000000
     */
    indicatorActiveColor: string;
    /** Swiper-item 可见时的 class */
    activeClass: string;
    /** Acceleration 设置为 true 时且处于滑动过程中，中间若干屏处于可见时的 class */
    changingClass: boolean;
    /**
     * 是否自动切换
     *
     * 默认为 false
     */
    autoplay: boolean;
    /**
     * 当前所在滑块的下标
     *
     * 默认为 0
     */
    current: number;
    /** 当前所在滑块的 item-id ，不能与 current 被同时指定 */
    currentItemId: string;
    /**
     * 自动切换时间间隔
     *
     * 默认为 5000
     */
    interval: number;
    /**
     * 滑动动画时长
     *
     * 默认为 500
     */
    duration: number;
    /**
     * 是否采用衔接滑动，即播放到末尾后重新回到开头
     *
     * 默认为 false
     */
    circular: boolean;
    /**
     * 滑动方向是否为纵向
     *
     * 默认为 false
     */
    vertical: boolean;
    /**
     * 前边距，可用于露出前一项的一小部分
     *
     * 接受 px 和 rpx 值
     *
     * 默认为 0px
     */
    previousMargin: string;
    /**
     * 后边距，可用于露出后一项的一小部分
     *
     * 接受 px 和 rpx 值
     *
     * 默认为 0px
     */
    nextMargin: string;
    /**
     * 当开启时，会根据滑动速度，连续滑动多屏
     *
     * 默认 false
     */
    acceleration: boolean;
    /**
     * 是否禁用代码变动触发 swiper 切换时使用动画
     *
     * 默认为 false
     */
    disableProgrammaticAnimation: boolean;
    /**
     * 同时显示的滑块数量
     *
     * 默认为 1
     */
    displayMultipleItems: number;
    /**
     * 是否跳过未显示的滑块布局
     *
     * 设为 true 可优化复杂情况下的滑动性能，但会丢失隐藏状态滑块的布局信息
     *
     * 默认为 false
     */
    skipHiddenItemLayout: boolean;
    /**
     * 是否禁止用户 touch 操作
     *
     * 默认为 false
     */
    disableTouch: boolean;
    /**
     * 是否监听用户的触摸事件
     *
     * 只在初始化时有效，不支持动态修改
     *
     * 默认为 true
     */
    touchable: boolean;
    /**
     * 指定 swiper 切换缓动动画类型
     *
     * 默认为 default
     */
    easingFunction: _SwiperEasingFunction;
    /** Current 改变时触发 */
    onChange: _SwiperOnChange;
    /** Swiper-item 位置改变时触发 */
    onTransition: _SwiperOnTransition;
    /** 动画结束时触发 */
    onAnimationfinish: _SwiperOnAnimationfinish;
}>;
/**
 * 滑块视图容器，一般用于左右滑动或上下滑动，比如 banner 轮播图
 *
 * 注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换
 *
 * Swiper 下的每个 swiper-item 是一个滑动切换区域，不能停留在 2 个滑动区域之间
 */
type _Swiper = DefineComponent<_SwiperProps>;
/** 滑块视图容器实例 */
type _SwiperInstance = InstanceType<_Swiper>;

declare global {
    namespace UniHelper {
        /**
         * 导致变更的原因
         *
         * Autoplay 自动播放
         *
         * Touch 用户滑动
         *
         * 空字符串 其它原因
         */
        type SwiperSource = _SwiperSource;
        /** Swiper 切换动画类型 */
        type SwiperEasingFunction = _SwiperEasingFunction;
        interface SwiperOnChangeDetail extends _SwiperOnChangeDetail {
        }
        type SwiperOnChangeEvent = _SwiperOnChangeEvent;
        /** Current 改变时触发 */
        interface SwiperOnChange extends _SwiperOnChange {
        }
        interface SwiperOnTransitionDetail extends _SwiperOnTransitionDetail {
        }
        type SwiperOnTransitionEvent = _SwiperOnTransitionEvent;
        /** Swiper-item 位置改变时触发 */
        interface SwiperOnTransition extends _SwiperOnTransition {
        }
        interface SwiperOnAnimationfinishDetail extends _SwiperOnAnimationfinishDetail {
        }
        type SwiperOnAnimationfinishEvent = _SwiperOnAnimationfinishEvent;
        /** 动画结束时触发 */
        interface SwiperOnAnimationfinish extends _SwiperOnAnimationfinish {
        }
        /** 滑块视图容器属性 */
        type SwiperProps = _SwiperProps;
        /**
         * 滑块视图容器，一般用于左右滑动或上下滑动，比如 banner 轮播图
         *
         * 注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换
         *
         * Swiper 下的每个 swiper-item 是一个滑动切换区域，不能停留在 2 个滑动区域之间
         */
        type Swiper = _Swiper;
        /** 滑块视图容器实例 */
        type SwiperInstance = _SwiperInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 滑块视图容器，一般用于左右滑动或上下滑动，比如 banner 轮播图
         *
         * 注意滑动切换和滚动的区别，滑动切换是一屏一屏的切换
         *
         * Swiper 下的每个 swiper-item 是一个滑动切换区域，不能停留在 2 个滑动区域之间
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/swiper.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        swiper: _Swiper;
    }
}

/** Swiper 直接子组件属性 */
type _SwiperItemProps = CommonProps & Partial<{
    /** 标识符 */
    itemId: string;
}>;
/**
 * Swiper 直接子组件，宽高自动设置为父组件的 100%
 *
 * 不能被子组件自动撑开
 */
type _SwiperItem = DefineComponent<_SwiperItemProps>;
/** Swiper 直接子组件实例 */
type _SwiperItemInstance = InstanceType<_SwiperItem>;

declare global {
    namespace UniHelper {
        /** Swiper 直接子组件属性 */
        type SwiperItemProps = _SwiperItemProps;
        /**
         * Swiper 直接子组件，宽高自动设置为父组件的 100%
         *
         * 不能被子组件自动撑开
         */
        type SwiperItem = _SwiperItem;
        /** Swiper 直接子组件实例 */
        type SwiperItemInstance = _SwiperItemInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * Swiper 直接子组件，宽高自动设置为父组件的 100%
         *
         * 不能被子组件自动撑开
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/scroll-item.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        SwiperItem: _SwiperItem;
    }
}

/**
 * 屏幕方向
 *
 * Landscape 横向
 *
 * Portrait 纵向
 */
type _MatchMediaOrientation = "landscape" | "portrait";
/** Media query 匹配检测节点属性 */
type _MatchMediaProps = CommonProps & Partial<{
    /**
     * 页面最小宽度
     *
     * 单位为 px
     */
    minWidth: number;
    /**
     * 页面最大宽度
     *
     * 单位为 px
     */
    maxWidth: number;
    /**
     * 页面宽度
     *
     * 单位为 px
     */
    width: number;
    /**
     * 页面最小高度
     *
     * 单位为 px
     */
    minHeight: number;
    /**
     * 页面最大高度
     *
     * 单位为 px
     */
    maxHeight: number;
    /**
     * 页面高度
     *
     * 单位为 px
     */
    height: number;
    /**
     * 屏幕方向
     *
     * Landscape 横向
     *
     * Portrait 纵向
     */
    orientation: _MatchMediaOrientation;
}>;
/**
 * Media query 匹配检测节点
 *
 * 类似于网页开发中使用媒体查询来适配大屏小屏，这是一个可适配不同屏幕的基本视图组件
 *
 * 可以指定一组 media query 媒体查询规则，满足查询条件时，这个组件才会被展示
 */
type _MatchMedia = DefineComponent<_MatchMediaProps>;
/** Media query 匹配检测节点实例 */
type _MatchMediaInstance = InstanceType<_MatchMedia>;

declare global {
    namespace UniHelper {
        /**
         * 屏幕方向
         *
         * Landscape 横向
         *
         * Portrait 纵向
         */
        type MatchMediaOrientation = _MatchMediaOrientation;
        /** Media query 匹配检测节点属性 */
        type MatchMediaProps = _MatchMediaProps;
        /**
         * Media query 匹配检测节点
         *
         * 类似于网页开发中使用媒体查询来适配大屏小屏，这是一个可适配不同屏幕的基本视图组件
         *
         * 可以指定一组 media query 媒体查询规则，满足查询条件时，这个组件才会被展示
         */
        type MatchMedia = _MatchMedia;
        /** Media query 匹配检测节点 */
        type MatchMediaInstance = _MatchMediaInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * Media query 匹配检测节点
         *
         * 类似于网页开发中使用媒体查询来适配大屏小屏，这是一个可适配不同屏幕的基本视图组件
         *
         * 可以指定一组 media query 媒体查询规则，满足查询条件时，这个组件才会被展示
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/match-media.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        MatchMedia: _MatchMedia;
    }
}

/** 可拖动区域属性 */
type _MovableAreaProps = CommonProps & Partial<{
    /**
     * 当里面的 movable-view 设置为支持双指缩放时，设置此值可将缩放手势生效区域修改为整个 movable-area
     *
     * 默认为 false
     */
    scaleArea: boolean;
}>;
/**
 * 可拖动区域
 *
 * Movable-area 指代可拖动的范围，在其中内嵌 movable-view 组件用于指示可拖动的区域
 *
 * 即手指/鼠标按住 movable-view 拖动或双指缩放，但拖不出 movable-area 规定的范围
 *
 * 也可以不拖动，而使用代码来触发 movable-view 在 movable-area 里的移动缩放
 *
 * 默认宽高为 10px
 */
type _MovableArea = DefineComponent<_MovableAreaProps>;
/** 可拖动区域实例 */
type _MovableAreaInstance = InstanceType<_MovableArea>;

declare global {
    namespace UniHelper {
        /** 可拖动区域属性 */
        type MovableAreaProps = _MovableAreaProps;
        /**
         * 可拖动区域
         *
         * Movable-area 指代可拖动的范围，在其中内嵌 movable-view 组件用于指示可拖动的区域
         *
         * 即手指/鼠标按住 movable-view 拖动或双指缩放，但拖不出 movable-area 规定的范围
         *
         * 也可以不拖动，而使用代码来触发 movable-view 在 movable-area 里的移动缩放
         *
         * 默认宽高为 10px
         */
        type MovableArea = _MovableArea;
        /** 可拖动区域实例 */
        type MovableAreaInstance = _MovableAreaInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 可拖动区域
         *
         * Movable-area 指代可拖动的范围，在其中内嵌 movable-view 组件用于指示可拖动的区域
         *
         * 即手指/鼠标按住 movable-view 拖动或双指缩放，但拖不出 movable-area 规定的范围
         *
         * 也可以不拖动，而使用代码来触发 movable-view 在 movable-area 里的移动缩放
         *
         * 默认宽高为 10px
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/movable-area.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        MovableArea: _MovableArea;
    }
}

/** Movable-view 的移动方向 */
type _MovableViewDirection = "all" | "vertical" | "horizontal" | "none";
/**
 * Movable-view 产生移动的原因
 *
 * Touch 拖动
 *
 * Touch-out-of-bounds 超出移动范围
 *
 * Out-of-bounds 超出移动范围后的回弹
 *
 * Friction 惯性
 *
 * 空字符串 setData
 */
type _MovableViewSource = "touch" | "touch-out-of-bounds" | "out-of-bounds" | "friction" | "";
interface _MovableViewOnChangeDetail {
    x: number;
    y: number;
    /**
     * Movable-view 产生移动的原因
     *
     * Touch 拖动
     *
     * Touch-out-of-bounds 超出移动范围
     *
     * Out-of-bounds 超出移动范围后的回弹
     *
     * Friction 惯性
     *
     * 空字符串 setData
     */
    source: _MovableViewSource;
}
type _MovableViewOnChangeEvent = _CustomEvent<_MovableViewOnChangeDetail>;
/** 拖动过程中触发 */
type _MovableViewOnChange = (event: _MovableViewOnChangeEvent) => void;
interface _MovableViewOnScaleDetail {
    x: number;
    y: number;
    /**
     * 是否支持双指缩放
     *
     * 默认缩放手势生效区域是在 movable-view 内
     */
    scale: boolean;
}
type _MovableViewOnScaleEvent = _CustomEvent<_MovableViewOnScaleDetail>;
/** 缩放过程中触发 */
type _MovableViewOnScale = (event: _MovableViewOnScaleEvent) => void;
/** 可移动的视图容器属性 */
type _MovableViewProps = CommonProps & Partial<{
    /**
     * Movable-view 的移动方向
     *
     * 默认为 none
     */
    direction: _MovableViewDirection;
    /**
     * 是否带有惯性
     *
     * 默认为 false
     */
    inertia: boolean;
    /**
     * 超过可移动区域后，是否还可以移动
     *
     * 默认为 false
     */
    outOfBounds: boolean;
    /**
     * 定义 x 轴方向的偏移
     *
     * 如果 x 的值不在可移动范围内，会自动移动到可移动范围
     *
     * 改变 x 的值会触发动画
     */
    x: string | number;
    /**
     * 定义 y 轴方向的偏移
     *
     * 如果 y 的值不在可移动范围内，会自动移动到可移动范围
     *
     * 改变 y 的值会触发动画
     */
    y: string | number;
    /**
     * 阻尼系数，用于控制 x 或 y 改变时的动画和过界回弹的动画
     *
     * 值越大移动越快
     *
     * 默认为 20
     */
    damping: number;
    /**
     * 摩擦系数，用于控制惯性滑动的动画
     *
     * 值越大摩擦力越大，滑动越快停止
     *
     * 必须大于 0，否则会被设置成默认值
     *
     * 默认为 2
     */
    friction: number;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /**
     * 是否支持双指缩放
     *
     * 默认缩放手势生效区域是在 movable-view 内
     *
     * 默认为 false
     */
    scale: boolean;
    /**
     * 定义缩放倍数最小值
     *
     * 默认为 0.5
     */
    scaleMin: number;
    /**
     * 定义缩放倍数最大值
     *
     * 默认为 10
     */
    scaleMax: number;
    /**
     * 定义缩放倍数
     *
     * 取值范围为 0.5 - 10
     *
     * 默认为 1
     */
    scaleValue: number;
    /**
     * 是否使用动画
     *
     * 默认为 true
     */
    animation: boolean;
    /** 拖动过程中触发 */
    onChange: _MovableViewOnChange;
    /** 缩放过程中触发 */
    onScale: _MovableViewOnScale;
}>;
/**
 * 可移动的视图容器，在页面中可以拖拽滑动或双指缩放
 *
 * Movable-area 直接子组件
 */
type _MovableView = DefineComponent<_MovableViewProps>;
/** 可移动的视图容器实例 */
type _MovableViewInstance = InstanceType<_MovableView>;

declare global {
    namespace UniHelper {
        /** Movable-view 的移动方向 */
        type MovableViewDirection = _MovableViewDirection;
        /**
         * Movable-view 产生移动的原因
         *
         * Touch 拖动
         *
         * Touch-out-of-bounds 超出移动范围
         *
         * Out-of-bounds 超出移动范围后的回弹
         *
         * Friction 惯性
         *
         * 空字符串 setData
         */
        type MovableViewSource = _MovableViewSource;
        interface MovableViewOnChangeDetail extends _MovableViewOnChangeDetail {
        }
        type MovableViewOnChangeEvent = _MovableViewOnChangeEvent;
        /** 拖动过程中触发 */
        interface MovableViewOnChange extends _MovableViewOnChange {
        }
        interface MovableViewOnScaleDetail extends _MovableViewOnScaleDetail {
        }
        type MovableViewOnScaleEvent = _MovableViewOnScaleEvent;
        /** 缩放过程中触发 */
        interface MovableViewOnScale extends _MovableViewOnScale {
        }
        /** 可移动的视图容器属性 */
        type MovableViewProps = _MovableViewProps;
        /**
         * 可移动的视图容器，在页面中可以拖拽滑动或双指缩放
         *
         * Movable-area 直接子组件
         */
        type MovableView = _MovableView;
        /** 可移动的视图容器实例 */
        type MovableViewInstance = _MovableViewInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 可移动的视图容器，在页面中可以拖拽滑动或双指缩放
         *
         * Movable-area 直接子组件
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/movable-view.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        MovableView: _MovableView;
    }
}

/** 覆盖在原生组件之上的视图属性 */
type _CoverViewProps = CommonProps & Partial<{
    /**
     * 设置顶部滚动偏移量
     *
     * 仅在设置了 overflow-y: scroll 成为滚动元素后生效
     */
    scrollTop: number | string;
}>;
/**
 * 覆盖在原生组件之上的视图
 *
 * App-vue 和小程序框架，渲染引擎是 webview
 *
 * 为了优化体验，部分组件如 map、video、textarea、canvas 通过原生控件实现，原生组件层级高于前端组件
 *
 * 为了能正常覆盖原生组件，设计了 cover-view
 */
type _CoverView = DefineComponent<_CoverViewProps>;
/** 覆盖在原生组件之上的视图 */
type _CoverViewInstance = InstanceType<_CoverView>;

declare global {
    namespace UniHelper {
        /** 覆盖在原生组件之上的视图 */
        type CoverViewProps = _CoverViewProps;
        /**
         * 覆盖在原生组件之上的视图
         *
         * App-vue 和小程序框架，渲染引擎是 webview
         *
         * 为了优化体验，部分组件如 map、video、textarea、canvas 通过原生控件实现，原生组件层级高于前端组件
         *
         * 为了能正常覆盖原生组件，设计了 cover-view
         */
        type CoverView = _CoverView;
        /** 覆盖在原生组件之上的视图实例 */
        type CoverViewInstance = _CoverViewInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 覆盖在原生组件之上的视图
         *
         * App-vue 和小程序框架，渲染引擎是 webview
         *
         * 为了优化体验，部分组件如 map、video、textarea、canvas 通过原生控件实现，原生组件层级高于前端组件
         *
         * 为了能正常覆盖原生组件，设计了 cover-view
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/cover-view.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        CoverView: _CoverView;
    }
}

type _CoverImageOnLoadEvent = _BaseEvent;
/** 图片加载成功时触发 */
type _CoverImageOnLoad = (event: _CoverImageOnLoadEvent) => void;
type _CoverImageOnErrorEvent = _BaseEvent;
/** 图片加载失败时触发 */
type _CoverImageOnError = (event: _CoverImageOnErrorEvent) => void;
/** 覆盖在原生组件之上的图片视图属性 */
type _CoverImageProps = CommonProps & Partial<{
    /**
     * 图片路径
     *
     * 支持本地路径、网络路径
     *
     * 不支持 base64 格式
     */
    src: string;
    /** 图片加载成功时触发 */
    onLoad: _CoverImageOnLoad;
    /** 图片加载失败时触发 */
    onError: _CoverImageOnError;
}>;
/**
 * 覆盖在原生组件之上的图片视图
 *
 * 可覆盖的原生组件同 cover-view
 *
 * 支持嵌套在 cover-view 里
 */
type _CoverImage = DefineComponent<_CoverImageProps>;
/** 覆盖在原生组件之上的图片视图实例 */
type _CoverImageInstance = InstanceType<_CoverImage>;

declare global {
    namespace UniHelper {
        type CoverImageOnLoadEvent = _CoverImageOnLoadEvent;
        /** 图片加载成功时触发 */
        interface CoverImageOnLoad extends _CoverImageOnLoad {
        }
        type CoverImageOnErrorEvent = _CoverImageOnErrorEvent;
        /** 图片加载失败时触发 */
        interface CoverImageOnError extends _CoverImageOnError {
        }
        /** 覆盖在原生组件之上的图片视图属性 */
        type CoverImageProps = _CoverImageProps;
        /**
         * 覆盖在原生组件之上的图片视图
         *
         * 可覆盖的原生组件同 cover-view
         *
         * 支持嵌套在 cover-view 里
         */
        type CoverImage = _CoverImage;
        /** 覆盖在原生组件之上的图片视图实例 */
        type CoverImageInstance = _CoverImageInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 覆盖在原生组件之上的图片视图
         *
         * 可覆盖的原生组件同 cover-view
         *
         * 支持嵌套在 cover-view 里
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/cover-image.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        CoverImage: _CoverImage;
    }
}

/** 图标属性 */
type _IconProps = CommonProps & Partial<{
    /** 类型 */
    type: string;
    /**
     * 大小
     *
     * 单位为 px
     *
     * 默认为 23
     */
    size: number;
    /** 颜色 */
    color: string;
}>;
/** 图标 */
type _Icon = DefineComponent<_IconProps>;
/** 图标实例 */
type _IconInstance = InstanceType<_Icon>;

declare global {
    namespace UniHelper {
        /** 图标属性 */
        type IconProps = _IconProps;
        /** 图标 */
        type Icon = _Icon;
        /** 图标实例 */
        type IconInstance = _IconInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 图标
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/icon.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        icon: _Icon;
    }
}

/**
 * 显示连续空格
 *
 * Ensp 中文字符空格一半大小
 *
 * Emsp 中文字符空格大小
 *
 * Nbsp 根据字体设置的空格大小
 */
type _TextSpace = "ensp" | "emsp" | "nbsp";
/** 文本组件属性 */
type _TextProps = CommonProps & Partial<{
    /**
     * 文本是否可选
     *
     * 默认为 false
     */
    selectable: boolean;
    /**
     * 文本是否可选，可能会使文本节点显示为 inline-block
     *
     * 默认为 false
     */
    userSelect: boolean;
    /**
     * 显示连续空格
     *
     * Ensp 中文字符空格一半大小
     *
     * Emsp 中文字符空格大小
     *
     * Nbsp 根据字体设置的空格大小
     *
     * 没有默认值
     */
    space: _TextSpace;
    /**
     * 是否解码
     *
     * 默认为 false
     */
    decode: boolean;
}>;
/**
 * 文本组件
 *
 * 用于包裹文本内容
 */
type _Text = DefineComponent<_TextProps>;
/** 文本组件实例 */
type _TextInstance = InstanceType<_Text>;

declare global {
    namespace UniHelper {
        /**
         * 显示连续空格
         *
         * Ensp 中文字符空格一半大小
         *
         * Emsp 中文字符空格大小
         *
         * Nbsp 根据字体设置的空格大小
         */
        type TextSpace = _TextSpace;
        /** 文本组件属性 */
        type TextProps = _TextProps;
        /**
         * 文本组件
         *
         * 用于包裹文本内容
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/text.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        type Text = _Text;
        /** 文本组件实例 */
        type TextInstance = _TextInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 文本组件
         *
         * 用于包裹文本内容
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/text.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        text: _Text;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 文本组件
             *
             * 用于包裹文本内容
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/text.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            text: _Text;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 文本组件
             *
             * 用于包裹文本内容
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/text.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            text: _Text;
        }
    }
}

/** 显示连续空格 */
type _RichTextSpace = "ensp" | "emsp" | "nbsp";
/** 文本节点 */
interface _RichTextTextNode {
    type: "text";
    text: string;
}
/** 元素节点 */
interface _RichTextNodeNode {
    type?: "node";
    name: string;
    attrs?: Record<string, any>;
    children?: Array<_RichTextTextNode | _RichTextNodeNode>;
}
/** 节点 */
type _RichTextNode = _RichTextTextNode | _RichTextNodeNode;
/** 节点列表 */
type _RichTextNodes = _RichTextNode[] | string;
type _RichTextOnItemclickEvent = _CustomEvent<{
    node: _RichTextNode;
}>;
/** 拦截点击事件，支持 a 和 img 标签 */
type _RichTextOnItemclick = (event: _RichTextOnItemclickEvent) => void;
/** 富文本属性 */
type _RichTextProps = CommonProps & Partial<{
    /** 节点列表 */
    nodes: _RichTextNodes;
    /**
     * 显示连续空格
     *
     * 没有默认值
     */
    space: _RichTextSpace;
    /**
     * 富文本是否可以长按选中
     *
     * 默认为 true
     */
    selectable: boolean;
    /**
     * 是否阻止长按图片时弹起默认菜单
     *
     * 只在初始化时有效，不支持动态修改
     *
     * 默认为 false
     */
    imageMenuPrevent: boolean;
    /**
     * 富文本中的图片是否可点击预览
     *
     * 在不设置的情况下，若 rich-text 未监听点击事件，则默认开启
     *
     * 未显示设置 preview 时会进行点击默认预览判断，建议显示设置 preview
     */
    preview: boolean;
    /** 拦截点击事件，支持 a 和 img 标签 */
    onItemclick: _RichTextOnItemclick;
}>;
/** 富文本 */
type _RichText = DefineComponent<_RichTextProps>;
/** 富文本实例 */
type _RichTextInstance = InstanceType<_RichText>;

declare global {
    namespace UniHelper {
        /** 显示连续空格 */
        type RichTextSpace = _RichTextSpace;
        /** 文本节点 */
        interface RichTextTextNode extends _RichTextTextNode {
        }
        /** 元素节点 */
        interface RichTextNodeNode extends _RichTextNodeNode {
        }
        /** 节点 */
        type RichTextNode = _RichTextNode;
        /** 节点列表 */
        type RichTextNodes = _RichTextNodes;
        type RichTextOnItemclickEvent = _RichTextOnItemclickEvent;
        /** 拦截点击事件，支持 a 和 img 标签 */
        interface RichTextOnItemclick extends _RichTextOnItemclick {
        }
        /** 富文本属性 */
        type RichTextProps = _RichTextProps;
        /** 富文本 */
        type RichText = _RichText;
        /** 富文本实例 */
        type RichTextInstance = _RichTextInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 富文本
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/rich-text.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        RichText: _RichText;
    }
}

/**
 * 动画播放方式
 *
 * Backwards 动画从头播
 *
 * Forwards 动画从上次结束点接着播
 */
type _ProgressActiveMode = "backwards" | "forwards";
type _ProgressOnActiveendEvent = _BaseEvent;
/** 动画完成时触发 */
type _ProgressOnActiveend = (event: _ProgressOnActiveendEvent) => void;
/** 进度条属性 */
type _ProgressProps = CommonProps & Partial<{
    /**
     * 百分比
     *
     * 取值范围为 0 - 100
     *
     * 没有默认值
     */
    percent: number;
    /**
     * 是否在进度条右侧显示百分比
     *
     * 默认为 false
     */
    showInfo: boolean;
    /**
     * 圆角大小
     *
     * 默认为 0
     */
    borderRadius: number | string;
    /**
     * 进度条右侧显示的百分比字体大小
     *
     * 默认为 16
     */
    fontSize: number | string;
    /**
     * 进度条线的宽度
     *
     * 单位为 px
     *
     * 默认为 6
     */
    strokeWidth: number;
    /**
     * 已选择的进度条的颜色
     *
     * 默认为 #09bb07，百度默认为 #e6e6e6
     */
    activeColor: string;
    /**
     * 未选择的进度条的颜色
     *
     * 默认为 #ebebeb
     */
    backgroundColor: string;
    /**
     * 是否显示进度条从左往右的动画
     *
     * 默认为 false
     */
    active: boolean;
    /**
     * 动画播放方式
     *
     * Backwards 动画从头播
     *
     * Forwards 动画从上次结束点接着播
     *
     * 默认为 backwards
     */
    activeMode: _ProgressActiveMode;
    /**
     * 进度增加 1% 所需时间
     *
     * 单位为 ms
     *
     * 默认为 30
     */
    duration: number;
    /** 动画完成时触发 */
    onActiveend: _ProgressOnActiveend;
}>;
/** 进度条 */
type _Progress = DefineComponent<_ProgressProps>;
/** 进度条实例 */
type _ProgressInstance = InstanceType<_Progress>;

declare global {
    namespace UniHelper {
        /**
         * 动画播放方式
         *
         * Backwards 动画从头播
         *
         * Forwards 动画从上次结束点接着播
         */
        type ProgressActiveMode = _ProgressActiveMode;
        type ProgressOnActiveendEvent = _ProgressOnActiveendEvent;
        /** 动画完成时触发 */
        interface ProgressOnActiveend extends _ProgressOnActiveend {
        }
        /** 进度条属性 */
        type ProgressProps = _ProgressProps;
        /** 进度条 */
        type Progress = _Progress;
        /** 进度条实例 */
        type ProgressInstance = _ProgressInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 进度条
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/progress.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        progress: _Progress;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 进度条
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/progress.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            progress: _Progress;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 进度条
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/progress.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            progress: _Progress;
        }
    }
}

/**
 * 按钮的大小
 *
 * Default 默认
 *
 * Mini 小
 */
type _ButtonSize = "default" | "mini";
/**
 * 按钮的样式类型，如想在多端统一颜色，请用 default 然后自行写样式
 *
 * Primary 微信小程序、360 小程序为绿色，APP、H5、百度小程序、支付宝小程序、飞书小程序、快应用为蓝色，字节跳动小程序为红色，QQ
 * 小程序为浅蓝色
 *
 * Default 白色
 *
 * Warn 红色
 */
type _ButtonType = "primary" | "default" | "warn";
/**
 * 用于 form 组件，点击分别会触发 form 组件的 submit / reset 事件
 *
 * Submit 点击会触发 form 的 submit 事件
 *
 * Reset 点击会触发 form 的 reset 事件
 */
type _ButtonFormType = "submit" | "reset";
/**
 * 开放能力
 *
 * Feedback 打开“意见反馈”页面，用户可提交反馈内容并上传日志
 *
 * Share 触发用户转发
 *
 * GetUserInfo 获取用户信息，可以从 `@getuserinfo` 回调中获取到用户信息
 *
 * Contact 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 `@contact` 回调中获得具体信息
 *
 * GetPhoneNumber 获取用户手机号，可以从 `@getphonenumber` 回调中获取到用户信息
 *
 * LaunchApp 小程序中打开APP，可以通过 `app-parameter` 属性设定向 APP 传的参数
 *
 * OpenSetting 打开授权设置页
 *
 * ChooseAvatar 获取用户头像，可以从 `@chooseavatar` 回调中获取到头像信息
 *
 * GetAuthorize 支持小程序授权
 *
 * Lifestyle 关注生活号
 *
 * ContactShare 分享到通讯录好友
 *
 * OpenGroupProfile 呼起 QQ 群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时 manifest.json
 * 中必须配置 groupIdList
 *
 * OpenGuildProfile 呼起频道页面，可以通过 guild-id 属性设定需要打开的频道 ID
 *
 * OpenPublicProfile 打开公众号资料卡，可以通过 public-id 属性设定需要打开的公众号资料卡的号码，同时 manifest.json
 * 中必须配置 publicIdList
 *
 * ShareMessageToFriend 在自定义开放数据域组件中，向指定好友发起分享
 *
 * AddFriend 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权
 *
 * AddColorSign 添加彩签，点击后添加状态有用户提示，无回调
 *
 * AddGroupApp 添加群应用（只有管理员或群主有权操作），添加后给 button 绑定 `@addgroupapp` 事件接收回调数据
 *
 * AddToFavorites 收藏当前页面，点击按钮后会触发 Page.onAddToFavorites 方法
 *
 * ChooseAddress 选择用户收货地址，可以从 `@chooseaddress` 回调中获取到用户选择的地址信息
 *
 * ChooseInvoiceTitle 选择用户发票抬头，可以从 `@chooseinvoicetitle` 回调中获取到用户选择发票抬头信息
 *
 * Login 登录，可以从 `@login` 回调中确认是否登录成功
 *
 * Subscribe 订阅类模板消息，需要用户授权才可发送
 *
 * Favorite 触发用户收藏
 *
 * WatchLater 触发用户稍后再看
 *
 * OpenProfile 触发打开用户主页
 *
 * AgreePrivacyAuthorization 用户同意隐私协议按钮
 */
type _ButtonOpenType = "feedback" | "share" | "getUserInfo" | "contact" | "getPhoneNumber" | "launchApp" | "openSetting" | "chooseAvatar" | "getAuthorize" | "lifestyle" | "contactShare" | "openGroupProfile" | "openGuildProfile" | "openPublicProfile" | "shareMessageToFriend" | "addFriend" | "addColorSign" | "addGroupApp" | "addToFavorites" | "chooseAddress" | "chooseInvoiceTitle" | "login" | "subscribe" | "favorite" | "watchLater" | "openProfile" | "agreePrivacyAuthorization";
/**
 * 返回用户信息的语言
 *
 * Zh_CN 简体中文
 *
 * Zh_TW 繁体中文
 *
 * En 英文
 */
type _ButtonLang = "zh_CN" | "zh_TW" | "en";
interface _ButtonOnGetphonenumberDetail {
    /** 错误信息 */
    errMsg?: string;
    /** 动态令牌 */
    code?: string;
    /** 包括敏感数据在内的完整用户信息的加密数据 */
    encryptedData?: string;
    /** 加密算法的初始向量 */
    iv?: string;
    /** 敏感数据对应的云 ID，开通云开发的小程序才会返回，可通过云调用直接获取开放数据 */
    cloudID?: string;
}
type _ButtonOnGetphonenumberEvent = _CustomEvent<_ButtonOnGetphonenumberDetail>;
/**
 * 获取用户手机号时回调
 *
 * Open-type="getPhoneNumber" 时有效
 */
type _ButtonOnGetphonenumber = (event: _ButtonOnGetphonenumberEvent) => void;
type _ButtonOnErrorEvent = _BaseEvent;
/** 使用开放能力发生错误时回调 */
type _ButtonOnError = (event: _ButtonOnErrorEvent) => void;
interface _ButtonOnOpensettingDetail {
    authSetting: Record<string, any>;
}
type _ButtonOnOpensettingEvent = _CustomEvent<_ButtonOnOpensettingDetail>;
/**
 * 在打开授权设置页并关闭后回调
 *
 * Open-type="openSetting" 时有效
 */
type _ButtonOnOpensetting = (event: _ButtonOnOpensettingEvent) => void;
type _ButtonOnLaunchappEvent = _BaseEvent;
/**
 * 从小程序成功打开 APP 回调
 *
 * Open-type="launchApp" 时有效
 */
type _ButtonOnLaunchapp = (event: _ButtonOnLaunchappEvent) => void;
type _ButtonOnChooseavatarEvent = _BaseEvent;
/**
 * 获取用户头像回调
 *
 * Open-type="chooseAvatar" 时有效
 */
type _ButtonOnChooseavatar = (event: _ButtonOnChooseavatarEvent) => void;
type _ButtonOnAddgroupappEvent = _BaseEvent;
/**
 * 添加群应用回调
 *
 * Open-type="addGroupApp" 时有效
 */
type _ButtonOnAddgroupapp = (event: _ButtonOnAddgroupappEvent) => void;
type _ButtonOnChooseaddressEvent = _BaseEvent;
/**
 * 用户编辑并选择收货地址回调
 *
 * Open-type="chooseAddress" 时有效
 */
type _ButtonOnChooseaddress = (event: _ButtonOnChooseaddressEvent) => void;
type _ButtonOnChooseinvoicetitleEvent = _BaseEvent;
/**
 * 用户选择发票抬头回调
 *
 * Open-type="chooseInvoiceTitle" 时有效
 */
type _ButtonOnChooseinvoicetitle = (event: _ButtonOnChooseinvoicetitleEvent) => void;
type _ButtonOnSubscribeEvent = _BaseEvent;
/**
 * 订阅消息授权回调
 *
 * Open-type="subscribe" 时有效
 */
type _ButtonOnSubscribe = (event: _ButtonOnSubscribeEvent) => void;
type _ButtonOnLoginEvent = _BaseEvent;
/**
 * 登录回调
 *
 * Open-type="login" 时有效
 */
type _ButtonOnLogin = (event: _ButtonOnLoginEvent) => void;
type _ButtonOnAgreeprivacyauthorizationEvent = _BaseEvent;
/**
 * 用户同意隐私协议按钮回调
 *
 * Open-type="agreePrivacyAuthorization" 时有效
 */
type _ButtonOnAgreeprivacyauthorization = (event: _ButtonOnAgreeprivacyauthorizationEvent) => void;
/** 按钮属性 */
type _ButtonProps = CommonProps & Partial<{
    /**
     * 按钮的大小
     *
     * Default 默认
     *
     * Mini 小
     *
     * 默认为 default
     */
    size: _ButtonSize;
    /**
     * 按钮的样式类型
     *
     * Primary 微信小程序、360 小程序为绿色，APP、H5、百度小程序、支付宝小程序、飞书小程序、快应用为蓝色，字节跳动小程序为红色，QQ
     * 小程序为浅蓝色
     *
     * Default 白色
     *
     * Warn 红色
     *
     * 默认为 default
     */
    type: _ButtonType;
    /**
     * 按钮是否镂空，背景色透明
     *
     * 默认为 false
     */
    plain: boolean;
    /** 是否禁用 */
    disabled: boolean;
    /**
     * 是否带 loading 图标
     *
     * 默认为 false
     */
    loading: boolean;
    /**
     * 用于 form 组件，点击分别会触发 form 组件的 submit / reset 事件
     *
     * Submit 点击会触发 form 的 submit 事件
     *
     * Reset 点击会触发 form 的 reset 事件
     *
     * 没有默认值
     */
    formType: _ButtonFormType;
    /**
     * 开放能力
     *
     * Feedback 打开“意见反馈”页面，用户可提交反馈内容并上传日志
     *
     * Share 触发用户转发
     *
     * GetUserInfo 获取用户信息，可以从 `@getuserinfo` 回调中获取到用户信息
     *
     * Contact 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 `@contact` 回调中获得具体信息
     *
     * GetPhoneNumber 获取用户手机号，可以从 `@getphonenumber` 回调中获取到用户信息
     *
     * LaunchApp 小程序中打开APP，可以通过 `app-parameter` 属性设定向 APP 传的参数
     *
     * OpenSetting 打开授权设置页
     *
     * ChooseAvatar 获取用户头像，可以从 `@chooseavatar` 回调中获取到头像信息
     *
     * GetAuthorize 支持小程序授权
     *
     * Lifestyle 关注生活号
     *
     * ContactShare 分享到通讯录好友
     *
     * OpenGroupProfile 呼起 QQ 群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时
     * manifest.json 中必须配置 groupIdList
     *
     * OpenGuildProfile 呼起频道页面，可以通过 guild-id 属性设定需要打开的频道 ID
     *
     * OpenPublicProfile 打开公众号资料卡，可以通过 public-id 属性设定需要打开的公众号资料卡的号码，同时
     * manifest.json 中必须配置 publicIdList
     *
     * ShareMessageToFriend 在自定义开放数据域组件中，向指定好友发起分享
     *
     * AddFriend 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权
     *
     * AddColorSign 添加彩签，点击后添加状态有用户提示，无回调
     *
     * AddGroupApp 添加群应用（只有管理员或群主有权操作），添加后给 button 绑定 `@addgroupapp` 事件接收回调数据
     *
     * AddToFavorites 收藏当前页面，点击按钮后会触发 Page.onAddToFavorites 方法
     *
     * ChooseAddress 选择用户收货地址，可以从 `@chooseaddress` 回调中获取到用户选择的地址信息
     *
     * ChooseInvoiceTitle 选择用户发票抬头，可以从 `@chooseinvoicetitle` 回调中获取到用户选择发票抬头信息
     *
     * Login 登录，可以从 `@login` 回调中确认是否登录成功
     *
     * Subscribe 订阅类模板消息，需要用户授权才可发送
     *
     * Favorite 触发用户收藏
     *
     * WatchLater 触发用户稍后再看
     *
     * OpenProfile 触发打开用户主页
     */
    openType: _ButtonOpenType;
    /**
     * 指定按下去的样式类
     *
     * 当 hover-class="none" 时，没有点击态效果
     *
     * 默认为 button-hover
     */
    hoverClass: string;
    /**
     * 按住后多久出现点击态
     *
     * 单位为 ms
     *
     * 默认为 20
     */
    hoverStartTime: number;
    /**
     * 手指松开后点击态保留时间
     *
     * 单位为 ms
     *
     * 默认为 70
     */
    hoverStayTime: number;
    /**
     * 打开 APP 时，向 APP 传递的参数
     *
     * Open-type="launchApp" 时有效
     */
    appParameter: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     *
     * 默认为 false
     */
    hoverStopPropagation: boolean;
    /**
     * 返回用户信息的语言
     *
     * Zh_CN 简体中文
     *
     * Zh_TW 繁体中文
     *
     * En 英文
     *
     * 默认为 en
     */
    lang: _ButtonLang;
    /**
     * 会话来源
     *
     * Open-type="contact" 时有效
     */
    sessionFrom: string;
    /**
     * 会话内消息卡片标题
     *
     * Open-type="contact" 时有效
     *
     * 默认为当前标题
     */
    sendMessageTitle: string;
    /**
     * 会话内消息卡片点击跳转小程序路径
     *
     * Open-type="contact" 时有效
     *
     * 默认为当前分享路径
     */
    sendMessagePath: string;
    /**
     * 会话内消息卡片图片
     *
     * Open-type="contact" 时有效
     *
     * 默认为截图
     */
    sendMessageImg: string;
    /**
     * 是否显示会话内消息卡片
     *
     * 设置此参数为 true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息
     *
     * Open-type="contact" 时有效
     *
     * 默认为 false
     */
    showMessageCard: boolean;
    /**
     * 打开群资料卡时，传递的群号
     *
     * Open-type="openGroupProfile" 时有效
     */
    groupId: string;
    /**
     * 打开频道页面时，传递的频道号
     *
     * Open-type="openGuildProfile" 时有效
     */
    guildId: string;
    /**
     * 打开公众号资料卡时，传递的号码
     *
     * Open-type="openPublicProfile" 时有效
     */
    publicId: string;
    /**
     * 获取用户手机号时回调
     *
     * Open-type="getPhoneNumber" 时有效
     */
    onGetphonenumber: _ButtonOnGetphonenumber;
    /** 使用开放能力发生错误时回调 */
    onError: _ButtonOnError;
    /**
     * 在打开授权设置页并关闭后回调
     *
     * Open-type="openSetting" 时有效
     */
    onOpensetting: _ButtonOnOpensetting;
    /**
     * 从小程序成功打开 APP 回调
     *
     * Open-type="launchApp" 时有效
     */
    onLaunchapp: _ButtonOnLaunchapp;
    /**
     * 获取用户头像回调
     *
     * Open-type="chooseAvatar" 时有效
     */
    onChooseavatar: _ButtonOnChooseavatar;
    /**
     * 添加群应用回调
     *
     * Open-type="addGroupApp" 时有效
     */
    onAddgroupapp: _ButtonOnAddgroupapp;
    /**
     * 用户编辑并选择收货地址回调
     *
     * Open-type="chooseAddress" 时有效
     */
    onChooseaddress: _ButtonOnChooseaddress;
    /**
     * 用户选择发票抬头回调
     *
     * Open-type="chooseInvoiceTitle" 时有效
     */
    onChooseinvoicetitle: _ButtonOnChooseinvoicetitle;
    /**
     * 订阅消息授权回调
     *
     * Open-type="subscribe" 时有效
     */
    onSubscribe: _ButtonOnSubscribe;
    /**
     * 登录回调
     *
     * Open-type="login" 时有效
     */
    onLogin: _ButtonOnLogin;
    /**
     * 用户同意隐私协议回调
     *
     * Open-type="agreePrivacyAuthorization" 时有效
     */
    onAgreeprivacyauthorization: _ButtonOnAgreeprivacyauthorization;
}>;
/** 按钮 */
type _Button = DefineComponent<_ButtonProps>;
/** 按钮实例 */
type _ButtonInstance = InstanceType<_Button>;

declare global {
    namespace UniHelper {
        /**
         * 按钮的大小
         *
         * Default 默认
         *
         * Mini 小
         */
        type ButtonSize = _ButtonSize;
        /**
         * 按钮的样式类型，如想在多端统一颜色，请用 default 然后自行写样式
         *
         * Primary 微信小程序、360 小程序为绿色，APP、H5、百度小程序、支付宝小程序、飞书小程序、快应用为蓝色，字节跳动小程序为红色，QQ
         * 小程序为浅蓝色
         *
         * Default 白色
         *
         * Warn 红色
         */
        type ButtonType = _ButtonType;
        /**
         * 用于 form 组件，点击分别会触发 form 组件的 submit / reset 事件
         *
         * Submit 点击会触发 form 的 submit 事件
         *
         * Reset 点击会触发 form 的 reset 事件
         */
        type ButtonFormType = _ButtonFormType;
        /**
         * 开放能力
         *
         * Feedback 打开“意见反馈”页面，用户可提交反馈内容并上传日志
         *
         * Share 触发用户转发
         *
         * GetUserInfo 获取用户信息，可以从 `@getuserinfo` 回调中获取到用户信息
         *
         * Contact 打开客服会话，如果用户在会话中点击消息卡片后返回应用，可以从 `@contact` 回调中获得具体信息
         *
         * GetPhoneNumber 获取用户手机号，可以从 `@getphonenumber` 回调中获取到用户信息
         *
         * LaunchApp 小程序中打开APP，可以通过 `app-parameter` 属性设定向 APP 传的参数
         *
         * OpenSetting 打开授权设置页
         *
         * ChooseAvatar 获取用户头像，可以从 `@chooseavatar` 回调中获取到头像信息
         *
         * GetAuthorize 支持小程序授权
         *
         * Lifestyle 关注生活号
         *
         * ContactShare 分享到通讯录好友
         *
         * OpenGroupProfile 呼起 QQ 群资料卡页面，可以通过 group-id 属性设定需要打开的群资料卡的群号，同时
         * manifest.json 中必须配置 groupIdList
         *
         * OpenGuildProfile 呼起频道页面，可以通过 guild-id 属性设定需要打开的频道 ID
         *
         * OpenPublicProfile 打开公众号资料卡，可以通过 public-id 属性设定需要打开的公众号资料卡的号码，同时
         * manifest.json 中必须配置 publicIdList
         *
         * ShareMessageToFriend 在自定义开放数据域组件中，向指定好友发起分享
         *
         * AddFriend 添加好友，对方需要通过该小程序进行授权，允许被加好友后才能调用成功用户授权
         *
         * AddColorSign 添加彩签，点击后添加状态有用户提示，无回调
         *
         * AddGroupApp 添加群应用（只有管理员或群主有权操作），添加后给 button 绑定 `@addgroupapp` 事件接收回调数据
         *
         * AddToFavorites 收藏当前页面，点击按钮后会触发 Page.onAddToFavorites 方法
         *
         * ChooseAddress 选择用户收货地址，可以从 `@chooseaddress` 回调中获取到用户选择的地址信息
         *
         * ChooseInvoiceTitle 选择用户发票抬头，可以从 `@chooseinvoicetitle` 回调中获取到用户选择发票抬头信息
         *
         * Login 登录，可以从 `@login` 回调中确认是否登录成功
         *
         * Subscribe 订阅类模板消息，需要用户授权才可发送
         *
         * Favorite 触发用户收藏
         *
         * WatchLater 触发用户稍后再看
         *
         * OpenProfile 触发打开用户主页
         *
         * AgreePrivacyAuthorization 用户同意隐私协议
         */
        type ButtonOpenType = _ButtonOpenType;
        /**
         * 返回用户信息的语言
         *
         * Zh_CN 简体中文
         *
         * Zh_TW 繁体中文
         *
         * En 英文
         */
        type ButtonLang = _ButtonLang;
        interface ButtonOnGetphonenumberDetail extends _ButtonOnGetphonenumberDetail {
        }
        type ButtonOnGetphonenumberEvent = _ButtonOnGetphonenumberEvent;
        /**
         * 获取用户手机号时回调
         *
         * Open-type="getPhoneNumber" 时有效
         */
        interface ButtonOnGetphonenumber extends _ButtonOnGetphonenumber {
        }
        type ButtonOnErrorEvent = _ButtonOnErrorEvent;
        /** 使用开放能力发生错误时回调 */
        interface ButtonOnError extends _ButtonOnError {
        }
        interface ButtonOnOpensettingDetail extends _ButtonOnOpensettingDetail {
        }
        type ButtonOnOpensettingEvent = _ButtonOnOpensettingEvent;
        /**
         * 在打开授权设置页并关闭后回调
         *
         * Open-type="openSetting" 时有效
         */
        interface ButtonOnOpensetting extends _ButtonOnOpensetting {
        }
        type ButtonOnLaunchappEvent = _ButtonOnLaunchappEvent;
        /**
         * 从小程序成功打开 APP 回调
         *
         * Open-type="launchApp" 时有效
         */
        interface ButtonOnLaunchapp extends _ButtonOnLaunchapp {
        }
        type ButtonOnChooseavatarEvent = _ButtonOnChooseavatarEvent;
        /**
         * 获取用户头像回调
         *
         * Open-type="chooseAvatar" 时有效
         */
        interface ButtonOnChooseavatar extends _ButtonOnChooseavatar {
        }
        type ButtonOnAddgroupappEvent = _ButtonOnAddgroupappEvent;
        /**
         * 添加群应用回调
         *
         * Open-type="addGroupApp" 时有效
         */
        interface ButtonOnAddgroupapp extends _ButtonOnAddgroupapp {
        }
        type ButtonOnChooseaddressEvent = _ButtonOnChooseaddressEvent;
        /**
         * 用户编辑并选择收货地址回调
         *
         * Open-type="chooseAddress" 时有效
         */
        interface ButtonOnChooseaddress extends _ButtonOnChooseaddress {
        }
        type ButtonOnChooseinvoicetitleEvent = _ButtonOnChooseinvoicetitleEvent;
        /**
         * 用户选择发票抬头回调
         *
         * Open-type="chooseInvoiceTitle" 时有效
         */
        interface ButtonOnChooseinvoicetitle extends _ButtonOnChooseinvoicetitle {
        }
        type ButtonOnSubscribeEvent = _ButtonOnSubscribeEvent;
        /**
         * 订阅消息授权回调
         *
         * Open-type="subscribe" 时有效
         */
        interface ButtonOnSubscribe extends _ButtonOnSubscribe {
        }
        type ButtonOnLoginEvent = _ButtonOnLoginEvent;
        /**
         * 登录回调
         *
         * Open-type="login" 时有效
         */
        interface ButtonOnLogin extends _ButtonOnLogin {
        }
        type ButtonOnAgreeprivacyauthorizationEvent = _ButtonOnAgreeprivacyauthorizationEvent;
        /**
         * 用户同意隐私协议回调
         *
         * Open-type="agreePrivacyAuthorization" 时有效
         */
        interface ButtonOnAgreeprivacyauthorization extends _ButtonOnAgreeprivacyauthorization {
        }
        /** 按钮属性 */
        type ButtonProps = _ButtonProps;
        /** 按钮 */
        type Button = _Button;
        /** 按钮实例 */
        type ButtonInstance = _ButtonInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 按钮
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/button.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        button: _Button;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 按钮
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/button.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            button: _Button;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 按钮
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/button.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            button: _Button;
        }
    }
}

/**
 * 标识
 *
 * 选中时触发 checkbox-group 的 change 事件并携带 value
 */
type _CheckboxValue = string;
/** 多选项目属性 */
type _CheckboxProps = CommonProps & Partial<{
    /** 在 form 中作为 key */
    name: string;
    /**
     * 标识
     *
     * 选中时触发 checkbox-group 的 change 事件并携带 value
     */
    value: _CheckboxValue;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /**
     * 当前是否选中，可用于设置默认选中
     *
     * 默认为 false
     */
    checked: boolean;
    /** 颜色 */
    color: string;
}>;
/** 多选项目 */
type _Checkbox = DefineComponent<_CheckboxProps>;
/** 多选项目实例 */
type _CheckboxInstance = InstanceType<_Checkbox>;

declare global {
    namespace UniHelper {
        /**
         * 标识
         *
         * 选中时触发 checkbox-group 的 change 事件并携带 value
         */
        type CheckboxValue = _CheckboxValue;
        /** 多选项目属性 */
        type CheckboxProps = _CheckboxProps;
        /** 多选项目 */
        type Checkbox = _Checkbox;
        /** 多选项目实例 */
        type CheckboxInstance = _CheckboxInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 多选项目
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/checkbox.html#checkbox)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        checkbox: _Checkbox;
    }
}

interface _CheckboxGroupOnChangeDetail {
    value: _CheckboxValue[];
}
type _CheckboxGroupOnChangeEvent = _CustomEvent<_CheckboxGroupOnChangeDetail>;
/** 选中项发生改变时触发 */
type _CheckboxGroupOnChange = (event: _CheckboxGroupOnChangeEvent) => void;
/** 多项选择器属性 */
type _CheckboxGroupProps = CommonProps & Partial<{
    /** 选中项发生改变时触发 */
    onChange: _CheckboxGroupOnChange;
}>;
/** 多项选择器，内部由多个 checkbox 组成 */
type _CheckboxGroup = DefineComponent<_CheckboxGroupProps>;
/** 多项选择器实例 */
type _CheckboxGroupInstance = InstanceType<_CheckboxGroup>;

declare global {
    namespace UniHelper {
        interface CheckboxGroupOnChangeDetail extends _CheckboxGroupOnChangeDetail {
        }
        type CheckboxGroupOnChangeEvent = _CheckboxGroupOnChangeEvent;
        /** 选中项发生改变时触发 */
        interface CheckboxGroupOnChange extends _CheckboxGroupOnChange {
        }
        /** 多项选择器属性 */
        type CheckboxGroupProps = _CheckboxGroupProps;
        /** 多项选择器，内部由多个 checkbox 组成 */
        type CheckboxGroup = _CheckboxGroup;
        /** 多项选择器实例 */
        type CheckboxGroupInstance = _CheckboxGroupInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 多项选择器，内部由多个 checkbox 组成
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/checkbox.html#checkbox-group)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        CheckboxGroup: _CheckboxGroup;
    }
}

type _EditorOnReadyEvent = _BaseEvent;
/** 编辑器初始化完成时触发 */
type _EditorOnReady = (event: _EditorOnReadyEvent) => void;
interface _EditorOnFocusDetail {
    html: string;
    text: string;
    delta: Record<string, any>;
}
type _EditorOnFocusEvent = _CustomEvent<_EditorOnFocusDetail>;
/** 编辑器聚焦时触发 */
type _EditorOnFocus = (event: _EditorOnFocusEvent) => void;
interface _EditorOnBlurDetail {
    html: string;
    text: string;
    delta: Record<string, any>;
}
type _EditorOnBlurEvent = _CustomEvent<_EditorOnBlurDetail>;
/** 编辑器失焦时触发 */
type _EditorOnBlur = (event: _EditorOnBlurEvent) => void;
interface _EditorOnInputDetail {
    html: string;
    text: string;
    delta: Record<string, any>;
}
type _EditorOnInputEvent = _CustomEvent<_EditorOnInputDetail>;
/** 编辑器内容改变时触发 */
type _EditorOnInput = (event: _EditorOnInputEvent) => void;
type _EditorOnStatuschangeEvent = _BaseEvent;
/** 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 */
type _EditorOnStatuschange = (event: _EditorOnStatuschangeEvent) => void;
/** 编辑器属性 */
type _EditorProps = CommonProps & Partial<{
    /**
     * 是否只读
     *
     * 默认为 false
     */
    readOnly: boolean;
    /** 提示信息 */
    placeholder: string;
    /**
     * 点击图片时是否显示图片大小控件
     *
     * 默认为 false
     */
    showImgSize: boolean;
    /**
     * 点击图片时是否显示工具栏控件
     *
     * 默认为 false
     */
    showImgToolbar: boolean;
    /**
     * 点击图片时是否显示修改尺寸控件
     *
     * 默认为 false
     */
    showImgResize: string;
    /** 编辑器初始化完成时触发 */
    onReady: _EditorOnReady;
    /** 编辑器聚焦时触发 */
    onFocus: _EditorOnFocus;
    /** 编辑器失焦时触发 */
    onBlur: _EditorOnBlur;
    /** 编辑器内容改变时触发 */
    onInput: _EditorOnInput;
    /** 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 */
    onStatuschange: _EditorOnStatuschange;
}>;
/**
 * 富文本编辑器，可以对图片、文字进行编辑和混排
 *
 * 编辑器导出内容支持带标签的 html 和纯文本的 text，编辑器内部采用 delta 格式进行存储
 *
 * 通过 setContents 接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，建议开发者在应用内使用时通过 delta 进行插入
 *
 * 图片控件仅初始化时设置有效
 */
type _Editor = DefineComponent<_EditorProps>;
/** 富文本编辑器实例 */
type _EditorInstance = InstanceType<_Editor>;

declare global {
    namespace UniHelper {
        type EditorOnReadyEvent = _EditorOnReadyEvent;
        /** 编辑器初始化完成时触发 */
        interface EditorOnReady extends _EditorOnReady {
        }
        interface EditorOnFocusDetail extends _EditorOnFocusDetail {
        }
        type EditorOnFocusEvent = _EditorOnFocusEvent;
        /** 编辑器聚焦时触发 */
        interface EditorOnFocus extends _EditorOnFocus {
        }
        interface EditorOnBlurDetail extends _EditorOnBlurDetail {
        }
        type EditorOnBlurEvent = _EditorOnBlurEvent;
        /** 编辑器失焦时触发 */
        interface EditorOnBlur extends _EditorOnBlur {
        }
        interface EditorOnInputDetail extends _EditorOnInputDetail {
        }
        type EditorOnInputEvent = _EditorOnInputEvent;
        /** 编辑器内容改变时触发 */
        interface EditorOnInput extends _EditorOnInput {
        }
        type EditorOnStatuschangeEvent = _EditorOnStatuschangeEvent;
        /** 通过 Context 方法改变编辑器内样式时触发，返回选区已设置的样式 */
        interface EditorOnStatuschange extends _EditorOnStatuschange {
        }
        /** 编辑器属性 */
        type EditorProps = _EditorProps;
        /**
         * 富文本编辑器，可以对图片、文字进行编辑和混排
         *
         * 编辑器导出内容支持带标签的 html 和纯文本的 text，编辑器内部采用 delta 格式进行存储
         *
         * 通过 setContents 接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，建议开发者在应用内使用时通过 delta
         * 进行插入
         *
         * 图片控件仅初始化时设置有效
         */
        type Editor = _Editor;
        /** 富文本编辑器实例 */
        type EditorInstance = _EditorInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 富文本编辑器，可以对图片、文字进行编辑和混排
         *
         * 编辑器导出内容支持带标签的 html 和纯文本的 text，编辑器内部采用 delta 格式进行存储
         *
         * 通过 setContents 接口设置内容时，解析插入的 html 可能会由于一些非法标签导致解析错误，建议开发者在应用内使用时通过 delta
         * 进行插入
         *
         * 图片控件仅初始化时设置有效
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/editor.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        editor: _Editor;
    }
}

/** 输入框的内容 */
type _InputValue = string;
/**
 * Input 类型
 *
 * Text 文本输入键盘
 *
 * Number 数字输入键盘
 *
 * Idcard 身份证输入键盘
 *
 * Digit 带小数点的数字键盘
 *
 * Tel 电话输入键盘
 *
 * Safe-password 密码安全输入键盘
 *
 * Nickname 昵称输入键盘
 */
type _InputType = "text" | "number" | "idcard" | "digit" | "tel" | "safe-password" | "nickname";
/**
 * 文本区域的语义，根据类型自动填充
 *
 * OneTimeCode 一次性验证码
 */
type _InputTextContentType = "oneTimeCode";
/**
 * 设置键盘右下角按钮的文字
 *
 * Send 发送
 *
 * Search 搜索
 *
 * Next 下一个
 *
 * Go 前往
 *
 * Type="text" 时有效
 *
 * @decs done 完成
 */
type _InputConfirmType = "send" | "search" | "next" | "go" | "done";
/**
 * 枚举属性，提供了用户在编辑元素或其内容时可能输入的数据类型的提示
 *
 * None 无虚拟键盘，常用于实现自己的键盘输入控件
 *
 * Text 使用用户本地区域设置的标准文本输入键盘
 *
 * Decimal 小数输入键盘，包含数字和分隔符，减号键的显示与否因设备而异
 *
 * Numeric 数字输入键盘，减号键的显示与否因设备而异
 *
 * Tel 电话输入键盘，表单内电话输入框应使用 type="tel"
 *
 * Search 搜索输入键盘
 *
 * Email 邮件地址输入键盘，表单内邮件地址输入框应使用 type="email"
 *
 * Url 网址输入键盘，表单内网址输入因 type="url"
 */
type _InputInputMode = "none" | "text" | "decimal" | "numeric" | "tel" | "search" | "email" | "url";
interface _InputOnInputDetail {
    value: _InputValue;
    /** 光标位置 */
    cursor?: number;
    /** 键值 */
    keyCode?: number;
}
type _InputOnInputEvent = _CustomEvent<_InputOnInputDetail>;
/** 输入时触发 */
type _InputOnInput = (event: _InputOnInputEvent) => string | void;
interface _InputOnFocusDetail {
    value: _InputValue;
    /** 键盘高度 */
    height?: number;
}
type _InputOnFocusEvent = _CustomEvent<_InputOnFocusDetail>;
/** 聚焦时触发 */
type _InputOnFocus = (event: _InputOnFocusEvent) => void;
interface _InputOnBlurDetail {
    value: _InputValue;
}
type _InputOnBlurEvent = _CustomEvent<_InputOnBlurDetail>;
/** 失焦时触发 */
type _InputOnBlur = (event: _InputOnBlurEvent) => void;
interface _InputOnConfirmDetail {
    value: _InputValue;
}
type _InputOnConfirmEvent = _CustomEvent<_InputOnConfirmDetail>;
/** 点击完成按钮时触发 */
type _InputOnConfirm = (event: _InputOnConfirmEvent) => void;
interface _InputOnKeyboardheightchangeDetail {
    /** 键盘高度 */
    height: number;
    duration: number;
}
type _InputOnKeyboardheightchangeEvent = _CustomEvent<_InputOnKeyboardheightchangeDetail>;
/** 键盘高度变化时触发 */
type _InputOnKeyboardheightchange = (event: _InputOnKeyboardheightchangeEvent) => void;
/** 输入框属性 */
type _InputProps = CommonProps & Partial<{
    /** 在 form 中作为 key */
    name: string;
    /** 输入框的初始内容 */
    value: _InputValue;
    /**
     * Input 类型
     *
     * Text 文本输入键盘
     *
     * Number 数字输入键盘
     *
     * Idcard 身份证输入键盘
     *
     * Digit 带小数点的数字键盘
     *
     * Tel 电话输入键盘
     *
     * Safe-password 密码安全输入键盘
     *
     * Nickname 昵称输入键盘
     *
     * 默认为 text
     */
    type: _InputType;
    /**
     * 文本区域的语义，根据类型自动填充
     *
     * OneTimeCode 一次性验证码
     */
    textContentType: _InputTextContentType;
    /**
     * 是否是密码类型
     *
     * 默认为 false
     */
    password: boolean;
    /** 输入框为空时占位符 */
    placeholder: string;
    /** 指定 placeholder 的样式 */
    placeholderStyle: string;
    /**
     * 指定 placeholder 的样式类
     *
     * 默认为 input-placeholder
     */
    placeholderClass: string;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /**
     * 最大输入长度
     *
     * 设置为 -1 的时候不限制最大长度
     *
     * 默认为 140
     */
    maxlength: number;
    /**
     * 指定光标与键盘的距离
     *
     * 取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
     *
     * 单位为 px
     *
     * 默认为 0
     */
    cursorSpacing: number;
    /**
     * 是否获取焦点
     *
     * 默认为 false
     */
    focus: boolean;
    /**
     * 是否自动聚焦，拉起键盘
     *
     * 默认为 false
     */
    autoFocus: boolean;
    /**
     * 设置键盘右下角按钮的文字
     *
     * Send 发送
     *
     * Search 搜索
     *
     * Next 下一个
     *
     * Go 前往
     *
     * Type="text" 时有效
     *
     * 默认为 done
     *
     * @decs done 完成
     */
    confirmType: _InputConfirmType;
    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     *
     * 默认为 false
     */
    confirmHold: boolean;
    /** 指定 focus 时的光标位置 */
    cursor: number;
    /**
     * 光标起始位置，自动聚焦时有效，需与 selection-end 搭配使用
     *
     * 默认为 -1
     */
    selectionStart: number;
    /**
     * 光标结束位置，自动聚焦时有效，需与 selection-start 搭配使用
     *
     * 默认为 -1
     */
    selectionEnd: number;
    /**
     * 键盘弹起时，是否自动上推页面
     *
     * 默认为 true
     */
    adjustPosition: boolean;
    /**
     * 聚焦时，点击页面的时候是否不收起键盘
     *
     * 默认为 false
     */
    holdKeyboard: boolean;
    /**
     * 键盘收起时，是否自动失焦
     *
     * 默认为 false
     */
    autoBlur: boolean;
    /**
     * 是否忽略组件内对文本合成系统事件的处理
     *
     * 为 false 时将触发 compositionstart、compositionend、compositionupdate
     * 事件，且在文本合成期间会触发 input 事件
     *
     * 默认为 true
     */
    ignoreCompositionEvent: boolean;
    /**
     * 是否强制 input 处于同层状态，仅在 iOS 生效
     *
     * 默认聚焦时 input 会切到非同层状态
     *
     * 默认为 false
     */
    alwaysEmbed: boolean;
    /** 安全键盘加密公钥的路径，只支持包内路径 */
    safePasswordCertPath: string;
    /** 安全键盘输入密码长度 */
    safePasswordLength: number;
    /** 安全键盘加密时间戳 */
    safePasswordTimeStamp: number;
    /** 安全键盘加密盐值 */
    safePasswordNonce: string;
    /** 安全键盘计算 hash 盐值，若指定 custom-hash 则无效 */
    safePasswordSalt: string;
    /** 安全键盘计算 hash 的算法表达式 */
    safePasswordCustomHash: string;
    /**
     * 当 type 为 number、digit、idcard 时，数字键盘是否随机排列
     *
     * 默认为 false
     */
    randomNumber: boolean;
    /**
     * 是否为受控组件
     *
     * 为 true 时，value 内容会完全受 setData 控制
     *
     * 默认为 false
     */
    controlled: boolean;
    /**
     * 是否强制使用系统键盘和 Web-view 创建的 input 元素
     *
     * 为 true 时，confirm-type、confirm-hold 可能失效
     *
     * 默认为 false
     */
    alwaysSystem: boolean;
    /**
     * 枚举属性，提供了用户在编辑元素或其内容时可能输入的数据类型的提示
     *
     * None 无虚拟键盘，常用于实现自己的键盘输入控件
     *
     * Text 使用用户本地区域设置的标准文本输入键盘
     *
     * Decimal 小数输入键盘，包含数字和分隔符，减号键的显示与否因设备而异
     *
     * Numeric 数字输入键盘，减号键的显示与否因设备而异
     *
     * Tel 电话输入键盘，表单内电话输入框应使用 type="tel"
     *
     * Search 搜索输入键盘
     *
     * Email 邮件地址输入键盘，表单内邮件地址输入框应使用 type="email"
     *
     * Url 网址输入键盘，表单内网址输入因 type="url"
     */
    inputMode: _InputInputMode;
    /** 输入时触发 */
    onInput: _InputOnInput;
    /** 聚焦时触发 */
    onFocus: _InputOnFocus;
    /** 失焦时触发 */
    onBlur: _InputOnBlur;
    /** 点击完成按钮时触发 */
    onConfirm: _InputOnConfirm;
    /** 键盘高度变化时触发 */
    onKeyboardheightchange: _InputOnKeyboardheightchange;
}>;
/** 输入框 */
type _Input = DefineComponent<_InputProps>;
/** 输入框实例 */
type _InputInstance = InstanceType<_Input>;

declare global {
    namespace UniHelper {
        /** 输入框的内容 */
        type InputValue = _InputValue;
        /**
         * Input 类型
         *
         * Text 文本输入键盘
         *
         * Number 数字输入键盘
         *
         * Idcard 身份证输入键盘
         *
         * Digit 带小数点的数字键盘
         *
         * Tel 电话输入键盘
         *
         * Safe-password 密码安全输入键盘
         *
         * Nickname 昵称输入键盘
         */
        type InputType = _InputType;
        /**
         * 文本区域的语义，根据类型自动填充
         *
         * OneTimeCode 一次性验证码
         */
        type InputTextContentType = _InputTextContentType;
        /**
         * 设置键盘右下角按钮的文字
         *
         * Send 发送
         *
         * Search 搜索
         *
         * Next 下一个
         *
         * Go 前往
         *
         * Type="text" 时有效
         *
         * @decs done 完成
         */
        type InputConfirmType = _InputConfirmType;
        /**
         * 枚举属性，提供了用户在编辑元素或其内容时可能输入的数据类型的提示
         *
         * None 无虚拟键盘，常用于实现自己的键盘输入控件
         *
         * Text 使用用户本地区域设置的标准文本输入键盘
         *
         * Decimal 小数输入键盘，包含数字和分隔符，减号键的显示与否因设备而异
         *
         * Numeric 数字输入键盘，减号键的显示与否因设备而异
         *
         * Tel 电话输入键盘，表单内电话输入框应使用 type="tel"
         *
         * Search 搜索输入键盘
         *
         * Email 邮件地址输入键盘，表单内邮件地址输入框应使用 type="email"
         *
         * Url 网址输入键盘，表单内网址输入因 type="url"
         */
        type InputInputMode = _InputInputMode;
        interface InputOnInputDetail extends _InputOnInputDetail {
        }
        type InputOnInputEvent = _InputOnInputEvent;
        /** 输入时触发 */
        interface InputOnInput extends _InputOnInput {
        }
        interface InputOnFocusDetail extends _InputOnFocusDetail {
        }
        type InputOnFocusEvent = _InputOnFocusEvent;
        /** 聚焦时触发 */
        interface InputOnFocus extends _InputOnFocus {
        }
        interface InputOnBlurDetail extends _InputOnBlurDetail {
        }
        type InputOnBlurEvent = _InputOnBlurEvent;
        /** 失焦时触发 */
        interface InputOnBlur extends _InputOnBlur {
        }
        interface InputOnConfirmDetail extends _InputOnConfirmDetail {
        }
        type InputOnConfirmEvent = _InputOnConfirmEvent;
        /** 点击完成按钮时触发 */
        interface InputOnConfirm extends _InputOnConfirm {
        }
        interface InputOnKeyboardheightchangeDetail extends _InputOnKeyboardheightchangeDetail {
        }
        type InputOnKeyboardheightchangeEvent = _InputOnKeyboardheightchangeEvent;
        /** 键盘高度变化时触发 */
        interface InputOnKeyboardheightchange extends _InputOnKeyboardheightchange {
        }
        /** 输入框属性 */
        type InputProps = _InputProps;
        /** 输入框 */
        type Input = _Input;
        /** 输入框实例 */
        type InputInstance = _InputInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 输入框
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/input.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        input: _Input;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 输入框
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/input.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            input: _Input;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 输入框
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/input.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            input: _Input;
        }
    }
}

/** 需要展示的内容 */
type _SelectorPickerRange = string[] | Record<string, any>[];
/** 当前选择的下标 */
type _SelectorPickerValue = number;
/** 大屏时 UI 类型，支持 picker、select、auto */
type _SelectorPickerSelectorType = "auto" | "picker" | "select";
interface _SelectorPickerOnChangeDetail {
    value: _SelectorPickerValue;
}
type _SelectorPickerOnChangeEvent = _CustomEvent<_SelectorPickerOnChangeDetail>;
/** Value 改变时触发 */
type _SelectorPickerOnChange = (event: _SelectorPickerOnChangeEvent) => void;
type _SelectorPickerOnCancelEvent = _BaseEvent;
/** 取消选择时触发 */
type _SelectorPickerOnCancel = (event: _SelectorPickerOnCancelEvent) => void;
type _SelectorPickerProps = CommonProps & Partial<{
    /** 在 form 中作为 key */
    name: string;
    /** 设置为普通选择器 */
    mode?: "selector";
    /**
     * 需要展示的内容
     *
     * 默认为 []
     */
    range: _SelectorPickerRange;
    /** 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容 */
    rangeKey: string;
    /**
     * 当前选择的下标
     *
     * 默认为 0
     */
    value: _SelectorPickerValue;
    /**
     * 大屏时 UI 类型，支持 picker、select、auto
     *
     * 默认在 iPad 以 picker 样式展示
     *
     * 默认在 PC 以 select 样式展示
     *
     * 默认为 auto
     */
    selectorType: _SelectorPickerSelectorType;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** Value 改变时触发 */
    onChange: _SelectorPickerOnChange;
    /** 取消选择时触发 */
    onCancel: _SelectorPickerOnCancel;
}>;
/** 需要展示的内容 */
type _MultiSelectorPickerRange = string[][] | Record<string, any>[][];
/** 当前某列选择的下标 */
type _MultiSelectorPickerValueElement = number;
/** 当前每列选择的下标 */
type _MultiSelectorPickerValue = _MultiSelectorPickerValueElement[];
interface _MultiSelectorPickerOnChangeDetail {
    value: _MultiSelectorPickerValue;
}
type _MultiSelectorPickerOnChangeEvent = _CustomEvent<_MultiSelectorPickerOnChangeDetail>;
/** Value 改变时触发 */
type _MultiSelectorPickerOnChange = (event: _MultiSelectorPickerOnChangeEvent) => void;
interface _MultiSelectorPickerOnColumnchangeDetail {
    column: number;
    value: _MultiSelectorPickerValueElement;
}
type _MultiSelectorPickerOnColumnchangeEvent = _CustomEvent<_MultiSelectorPickerOnColumnchangeDetail>;
/** 某一列 value 改变时触发 */
type _MultiSelectorPickerOnColumnchange = (event: _MultiSelectorPickerOnColumnchangeEvent) => void;
type _MultiSelectorPickerOnCancelEvent = _BaseEvent;
/** 取消选择时触发 */
type _MultiSelectorPickerOnCancel = (event: _MultiSelectorPickerOnCancelEvent) => void;
type _MultiSelectorPickerProps = Partial<{
    /** 在 form 中作为 key */
    name: string;
    /** 设置为多列选择器 */
    mode: "multiSelector";
    /**
     * 需要展示的内容
     *
     * 默认为 []
     */
    range: _MultiSelectorPickerRange;
    /** 当 range 是一个 Object Array 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容 */
    rangeKey: string;
    /**
     * 当前每列选择的下标
     *
     * 默认为列数个 0 组成的数组
     */
    value: _MultiSelectorPickerValue;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** Value 改变时触发 */
    onChange: _MultiSelectorPickerOnChange;
    /** 某一列 value 改变时触发 */
    onColumnchange: _MultiSelectorPickerOnColumnchange;
    /** 取消选择时触发 */
    onCancel: _MultiSelectorPickerOnCancel;
}>;
/**
 * 选中的时间
 *
 * 格式为 hh:mm
 */
type _TimePickerValue = string;
interface _TimePickerOnChangeDetail {
    value: _TimePickerValue;
}
type _TimePickerOnChangeEvent = _CustomEvent<_TimePickerOnChangeDetail>;
/** Value 改变时触发 */
type _TimePickerOnChange = (event: _TimePickerOnChangeEvent) => void;
type _TimePickerOnCancelEvent = _BaseEvent;
/** 取消选择时触发 */
type _TimePickerOnCancel = (event: _TimePickerOnCancelEvent) => void;
type _TimePickerProps = Partial<{
    /** 在 form 中作为 key */
    name: string;
    /** 设置为时间选择器 */
    mode: "time";
    /**
     * 选中的日期
     *
     * 格式为 hh:mm
     */
    value: _TimePickerValue;
    /**
     * 有效日期范围的开始
     *
     * 格式为 hh:mm
     */
    start: _TimePickerValue;
    /**
     * 有效日期范围的结束
     *
     * 格式为 hh:mm
     */
    end: _TimePickerValue;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** Value 改变时触发 */
    onChange: _TimePickerOnChange;
    /** 取消选择时触发 */
    onCancel: _TimePickerOnCancel;
}>;
/**
 * 选中的日期
 *
 * 格式为 YYYY-MM-DD
 */
type _DatePickerValue = string;
/**
 * 选择器的粒度
 *
 * Year 年
 *
 * Month 月
 *
 * Day 日
 */
type _DatePickerFields = "year" | "month" | "day";
interface _DatePickerOnChangeDetail {
    value: _DatePickerValue;
}
type _DatePickerOnChangeEvent = _CustomEvent<_DatePickerOnChangeDetail>;
/** Value 改变时触发 */
type _DatePickerOnChange = (event: _DatePickerOnChangeEvent) => void;
type _DatePickerOnCancelEvent = _BaseEvent;
/** 取消选择时触发 */
type _DatePickerOnCancel = (event: _DatePickerOnCancelEvent) => void;
type _DatePickerProps = Partial<{
    /** 在 form 中作为 key */
    name: string;
    /** 设置为日期选择器 */
    mode: "date";
    /**
     * 选中的日期
     *
     * 格式为 YYYY-MM-DD
     */
    value: _DatePickerValue;
    /**
     * 有效日期范围的开始
     *
     * 格式为 YYYY-MM-DD
     */
    start: _DatePickerValue;
    /**
     * 有效日期范围的结束
     *
     * 格式为 YYYY-MM-DD
     */
    end: _DatePickerValue;
    /**
     * 选择器的粒度
     *
     * Year 年
     *
     * Month 月
     *
     * Day 日
     *
     * 默认为 day
     */
    fields: _DatePickerFields;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** Value 改变时触发 */
    onChange: _DatePickerOnChange;
    /** 取消选择时触发 */
    onCancel: _DatePickerOnCancel;
}>;
type _RegionPickerValueElement = string;
/** 选中的省市区 */
type _RegionPickerValue = _RegionPickerValueElement[];
/**
 * 选择器层级
 *
 * Province 省级
 *
 * City 市级
 *
 * Region 区级
 *
 * Sub-district 街道级
 */
type _RegionPickerLevel = "province" | "city" | "region" | "sub-district";
interface _RegionPickerOnChangeDetail {
    value: _RegionPickerValue;
    /** 统计用区划代码 */
    code?: [string, string, string];
    /** 邮政编码 */
    postcode?: string;
}
type _RegionPickerOnChangeEvent = _CustomEvent<_RegionPickerOnChangeDetail>;
/** Value 改变时触发 */
type _RegionPickerOnChange = (event: _RegionPickerOnChangeEvent) => void;
type _RegionPickerOnCancelEvent = _BaseEvent;
/** 取消选择时触发 */
type _RegionPickerOnCancel = (event: _RegionPickerOnCancelEvent) => void;
type _RegionPickerProps = Partial<{
    /** 在 form 中作为 key */
    name: string;
    /** 设置为省市区选择器 */
    mode: "region";
    /**
     * 选中的省市区
     *
     * 默认选中每一列第一个值
     */
    value: _RegionPickerValue;
    /** 可为每一列的顶部添加一个自定义的项 */
    customItem: string;
    /**
     * 选择器层级
     *
     * Province 省级
     *
     * City 市级
     *
     * Region 区级
     *
     * Sub-district 街道级
     */
    level: _RegionPickerLevel;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** Value 改变时触发 */
    onChange: _RegionPickerOnChange;
    /** 取消选择时触发 */
    onCancel: _RegionPickerOnCancel;
}>;
type _PickerValue = _SelectorPickerValue | _MultiSelectorPickerValue | _TimePickerValue | _DatePickerValue | _RegionPickerValue;
/** 滚动选择器属性 */
type _PickerProps = _SelectorPickerProps | _MultiSelectorPickerProps | _TimePickerProps | _DatePickerProps | _RegionPickerProps;
/** 从底部弹起的滚动选择器，通过 mode 来区分 */
type _Picker = DefineComponent<_PickerProps>;
/** 从底部弹起的滚动选择器实例 */
type _PickerInstance = InstanceType<_Picker>;

declare global {
    namespace UniHelper {
        /** 需要展示的内容 */
        type SelectorPickerRange = _SelectorPickerRange;
        /** 当前选择的下标 */
        type SelectorPickerValue = _SelectorPickerValue;
        /** 大屏时 UI 类型，支持 picker、select、auto */
        type SelectorPickerSelectorType = _SelectorPickerSelectorType;
        interface SelectorPickerOnChangeDetail extends _SelectorPickerOnChangeDetail {
        }
        type SelectorPickerOnChangeEvent = _SelectorPickerOnChangeEvent;
        /** Value 改变时触发 */
        interface SelectorPickerOnChange extends _SelectorPickerOnChange {
        }
        type SelectorPickerOnCancelEvent = _SelectorPickerOnCancelEvent;
        /** 取消选择时触发 */
        interface SelectorPickerOnCancel extends _SelectorPickerOnCancel {
        }
        type SelectorPickerProps = _SelectorPickerProps;
        /** 需要展示的内容 */
        type MultiSelectorPickerRange = _MultiSelectorPickerRange;
        /** 当前某列选择的下标 */
        type MultiSelectorPickerValueElement = _MultiSelectorPickerValueElement;
        /** 当前每列选择的下标 */
        type MultiSelectorPickerValue = _MultiSelectorPickerValue;
        interface MultiSelectorPickerOnChangeDetail extends _MultiSelectorPickerOnChangeDetail {
        }
        type MultiSelectorPickerOnChangeEvent = _MultiSelectorPickerOnChangeEvent;
        /** Value 改变时触发 */
        interface MultiSelectorPickerOnChange extends _MultiSelectorPickerOnChange {
        }
        interface MultiSelectorPickerOnColumnchangeDetail extends _MultiSelectorPickerOnColumnchangeDetail {
        }
        type MultiSelectorPickerOnColumnchangeEvent = _MultiSelectorPickerOnColumnchangeEvent;
        /** 某一列 value 改变时触发 */
        interface MultiSelectorPickerOnColumnchange extends _MultiSelectorPickerOnColumnchange {
        }
        type MultiSelectorPickerOnCancelEvent = _MultiSelectorPickerOnCancelEvent;
        /** 取消选择时触发 */
        interface MultiSelectorPickerOnCancel extends _MultiSelectorPickerOnCancel {
        }
        type MultiSelectorPickerProps = _MultiSelectorPickerProps;
        /**
         * 选中的时间
         *
         * 格式为 hh:mm
         */
        type TimePickerValue = _TimePickerValue;
        interface TimePickerOnChangeDetail extends _TimePickerOnChangeDetail {
        }
        type TimePickerOnChangeEvent = _TimePickerOnChangeEvent;
        /** Value 改变时触发 */
        interface TimePickerOnChange extends _TimePickerOnChange {
        }
        type TimePickerOnCancelEvent = _TimePickerOnCancelEvent;
        /** 取消选择时触发 */
        interface TimePickerOnCancel extends _TimePickerOnCancel {
        }
        type TimePickerProps = _TimePickerProps;
        /**
         * 选中的日期
         *
         * 格式为 YYYY-MM-DD
         */
        type DatePickerValue = _DatePickerValue;
        /**
         * 选择器的粒度
         *
         * Year 年
         *
         * Month 月
         *
         * Day 日
         */
        type DatePickerFields = _DatePickerFields;
        interface DatePickerOnChangeDetail extends _DatePickerOnChangeDetail {
        }
        type DatePickerOnChangeEvent = _DatePickerOnChangeEvent;
        /** Value 改变时触发 */
        interface DatePickerOnChange extends _DatePickerOnChange {
        }
        type DatePickerOnCancelEvent = _DatePickerOnCancelEvent;
        /** 取消选择时触发 */
        interface DatePickerOnCancel extends _DatePickerOnCancel {
        }
        type DatePickerProps = _DatePickerProps;
        type RegionPickerValueElement = _RegionPickerValueElement;
        /** 选中的省市区 */
        type RegionPickerValue = _RegionPickerValue;
        /**
         * 选择器层级
         *
         * Province 省级
         *
         * City 市级
         *
         * Region 区级
         *
         * Sub-district 街道级
         */
        type RegionPickerLevel = _RegionPickerLevel;
        interface RegionPickerOnChangeDetail extends _RegionPickerOnChangeDetail {
        }
        type RegionPickerOnChangeEvent = _RegionPickerOnChangeEvent;
        /** Value 改变时触发 */
        interface RegionPickerOnChange extends _RegionPickerOnChange {
        }
        type RegionPickerOnCancelEvent = _RegionPickerOnCancelEvent;
        /** 取消选择时触发 */
        interface RegionPickerOnCancel extends _RegionPickerOnCancel {
        }
        type PickerValue = _PickerValue;
        type RegionPickerProps = _RegionPickerProps;
        /** 滚动选择器属性 */
        type PickerProps = _PickerProps;
        /** 从底部弹起的滚动选择器，通过 mode 来区分 */
        type Picker = _Picker;
        /** 从底部弹起的滚动选择器实例 */
        type PickerInstance = _PickerInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 从底部弹起的滚动选择器，通过 mode 来区分
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/picker.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        picker: _Picker;
    }
}

/**
 * 标识
 *
 * 被选中时，radio-group 的 change 事件会携带该 value
 */
type _RadioValue = string;
/** 单选项目属性 */
type _RadioProps = CommonProps & Partial<{
    /** 在 form 中作为 key */
    name: string;
    /**
     * 标识
     *
     * 被选中时，radio-group 的 change 事件会携带该 value
     */
    value: _RadioValue;
    /**
     * 当前是否选中
     *
     * 默认为 false
     */
    checked: boolean;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** 颜色 */
    color: string;
}>;
/** 单选项目 */
type _Radio = DefineComponent<_RadioProps>;
/** 单选项目实例 */
type _RadioInstance = InstanceType<_Radio>;

declare global {
    namespace UniHelper {
        /**
         * 标识
         *
         * 被选中时，radio-group 的 change 事件会携带该 value
         */
        type RadioValue = _RadioValue;
        /** 单选项目属性 */
        type RadioProps = _RadioProps;
        /** 单选项目 */
        type Radio = _Radio;
        /** 单选项目实例 */
        type RadioInstance = _RadioInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 单选项目
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/radio.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        radio: _Radio;
    }
}

/** 取值 */
type _SliderValue = number;
interface _SliderOnChangeDetail {
    value: _SliderValue;
}
type _SliderOnChangeEvent = _CustomEvent<_SliderOnChangeDetail>;
/** 完成一次拖动后触发 */
type _SliderOnChange = (event: _SliderOnChangeEvent) => void;
interface _SliderOnChangingDetail {
    value: _SliderValue;
}
type _SliderOnChangingEvent = _CustomEvent<_SliderOnChangingDetail>;
/** 拖动过程中触发 */
type _SliderOnChanging = (event: _SliderOnChangingEvent) => void;
/** 滑动选择器属性 */
type _SliderProps = CommonProps & Partial<{
    /** 在 form 中作为 key */
    name: string;
    /**
     * 最小值
     *
     * 默认为 0
     */
    min: _SliderValue;
    /**
     * 最大值
     *
     * 默认为 100
     */
    max: _SliderValue;
    /**
     * 步长，取值必须大于 0，并且可被 (max - min) 整除
     *
     * 默认为 1
     */
    step: _SliderValue;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /**
     * 当前取值
     *
     * 默认为 0
     */
    value: _SliderValue;
    /**
     * 滑块左侧已选择部分的线条颜色
     *
     * 默认为各平台默认色
     */
    activeColor: string;
    /**
     * 滑块右侧背景条的颜色
     *
     * 默认为 #e9e9e9
     */
    backgroundColor: string;
    /**
     * 滑块的大小
     *
     * 取值范围为 12 - 28
     *
     * 默认为 28
     */
    blockSize: number;
    /**
     * 滑块的颜色
     *
     * 默认为 #fff
     */
    blockColor: string;
    /**
     * 是否显示当前 value
     *
     * 默认为 false
     */
    showValue: boolean;
    /** 完成一次拖动后触发 */
    onChange: _SliderOnChange;
    /** 拖动过程中触发 */
    onChanging: _SliderOnChanging;
}>;
/** 滑动选择器 */
type _Slider = DefineComponent<_SliderProps>;
/** 滑动选择器实例 */
type _SliderInstance = InstanceType<_Slider>;

declare global {
    namespace UniHelper {
        /** 取值 */
        type SliderValue = _SliderValue;
        interface SliderOnChangeDetail extends _SliderOnChangeDetail {
        }
        type SliderOnChangeEvent = _SliderOnChangeEvent;
        /** 完成一次拖动后触发 */
        interface SliderOnChange extends _SliderOnChange {
        }
        interface SliderOnChangingDetail extends _SliderOnChangingDetail {
        }
        type SliderOnChangingEvent = _SliderOnChangingEvent;
        /** 拖动过程中触发 */
        interface SliderOnChanging extends _SliderOnChanging {
        }
        /** 滑动选择器属性 */
        type SliderProps = _SliderProps;
        /** 滑动选择器 */
        type Slider = _Slider;
        /** 滑动选择器实例 */
        type SliderInstance = _SliderInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 滑动选择器
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/slider.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        slider: _Slider;
    }
}

/** 是否选中 */
type _SwitchChecked = boolean;
/** 样式 */
type _SwitchType = "_Switch" | "checkbox";
interface _SwitchOnChangeDetail {
    value: _SwitchChecked;
}
type _SwitchOnChangeEvent = _CustomEvent<_SwitchOnChangeDetail>;
/** Checked 改变时触发 */
type _SwitchOnChange = (event: _SwitchOnChangeEvent) => void;
/** 开关选择器属性 */
type _SwitchProps = CommonProps & Partial<{
    /** 在 form 中作为 key */
    name: string;
    /**
     * 是否选中
     *
     * 默认为 false
     */
    checked: _SwitchChecked;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /** 样式 */
    type: _SwitchType;
    /** 颜色 */
    color: string;
    /** Checked 改变时触发 */
    onChange: _SwitchOnChange;
}>;
/** 开关选择器 */
type _Switch = DefineComponent<_SwitchProps>;
/** 开关选择器实例 */
type _SwitchInstance = InstanceType<_Switch>;

declare global {
    namespace UniHelper {
        /** 是否选中 */
        type SwitchChecked = _SwitchChecked;
        /** 样式 */
        type SwitchType = _SwitchType;
        interface SwitchOnChangeDetail extends _SwitchOnChangeDetail {
        }
        type SwitchOnChangeEvent = _SwitchOnChangeEvent;
        /** Checked 改变时触发 */
        interface SwitchOnChange extends _SwitchOnChange {
        }
        /** 开关选择器属性 */
        type SwitchProps = _SwitchProps;
        /** 开关选择器 */
        type Switch = _Switch;
        /** 开关选择器实例 */
        type SwitchInstance = _SwitchInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 开关选择器
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/switch.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        switch: _Switch;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 开关选择器
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/switch.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            switch: _Switch;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 开关选择器
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/switch.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            switch: _Switch;
        }
    }
}

/** 表单内 switch、input、checkbox、slider、radio、picker 对应的键值对 */
interface _FormOnSubmitDetailValue {
    [key: string]: _SwitchChecked | _InputValue | _CheckboxValue | _SliderValue | _RadioValue | _PickerValue;
}
interface _FormOnSubmitDetail {
    /** 表单内 switch、input、checkbox、slider、radio、picker 对应的键值对 */
    value: _FormOnSubmitDetailValue;
    /** Report-submit 为 true 时返回，用于发送模板消息 */
    formId?: string;
}
type _FormOnSubmitEvent = _CustomEvent<_FormOnSubmitDetail>;
/** 表单提交时触发 */
type _FormOnSubmit = (event: _FormOnSubmitEvent) => void;
type _FormOnResetEvent = _BaseEvent;
/** 表单重置时触发 */
type _FormOnReset = (event: _FormOnResetEvent) => void;
/** 表单属性 */
type _FormProps = CommonProps & Partial<{
    /**
     * 是否返回 formId 用于发送模板消息
     *
     * 默认为 false
     */
    reportSubmit: boolean;
    /**
     * 等待一段时间以确认 formId 是否生效
     *
     * 如果未指定这个参数，formId 有很小的概率无效（网络问题）
     *
     * 指定这个参数将可以检测 formId 是否有效，以这个参数的时间作为这项检测的超时时间
     *
     * 如果无效，将返回 requestFormId:fail 开头的 formId
     *
     * 单位为 ms
     *
     * 默认为 0
     */
    reportSubmitTimeout: number;
    /** 表单提交时触发 */
    onSubmit: _FormOnSubmit;
    /** 表单重置时触发 */
    onReset: _FormOnReset;
}>;
/**
 * 表单
 *
 * 将组件内的用户输入的 switch、input、checkbox、slider、radio、picker 提交
 */
type _Form = DefineComponent<_FormProps>;
/** 表单实例 */
type _FormInstance = InstanceType<_Form>;

declare global {
    namespace UniHelper {
        /** 表单内 switch、input、checkbox、slider、radio、picker 对应的键值对 */
        interface FormOnSubmitDetailValue extends _FormOnSubmitDetailValue {
        }
        interface FormOnSubmitDetail extends _FormOnSubmitDetail {
        }
        type FormOnSubmitEvent = _FormOnSubmitEvent;
        /** 表单提交时触发 */
        interface FormOnSubmit extends _FormOnSubmit {
        }
        type FormOnResetEvent = _FormOnResetEvent;
        /** 表单重置时触发 */
        interface FormOnReset extends _FormOnReset {
        }
        /** 表单属性 */
        type FormProps = _FormProps;
        /**
         * 表单
         *
         * 将组件内的用户输入的 switch、input、checkbox、slider、radio、picker 提交
         */
        type Form = _Form;
        /** 表单实例 */
        type FormInstance = _FormInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 表单
         *
         * 将组件内的用户输入的 switch、input、checkbox、slider、radio、picker 提交
         */
        Form: _Form;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 表单
             *
             * 将组件内的用户输入的 switch、input、checkbox、slider、radio、picker 提交
             */
            form: _Form;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 表单
             *
             * 将组件内的用户输入的 switch、input、checkbox、slider、radio、picker 提交
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/form.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            form: _Form;
        }
    }
}

/** 表单标签属性 */
type _LabelProps = CommonProps & Partial<{
    /** 绑定控件的 id */
    for: string;
}>;
/**
 * 表单标签
 *
 * 用来改进表单组件的可用性
 *
 * 使用 for 属性找到对应的 id，或者将控件放在该标签下，当点击时，就会触发对应的控件
 *
 * For 优先级高于内部控件，内部有多个控件的时候默认触发第一个控件
 */
type _Label = DefineComponent<_LabelProps>;
/** 表单标签实例 */
type _LabelInstance = InstanceType<_Label>;

declare global {
    namespace UniHelper {
        /** 标签属性 */
        type LabelProps = _LabelProps;
        /**
         * 表单标签
         *
         * 用来改进表单组件的可用性
         *
         * 使用 for 属性找到对应的 id，或者将控件放在该标签下，当点击时，就会触发对应的控件
         *
         * For 优先级高于内部控件，内部有多个控件的时候默认触发第一个控件
         */
        type Label = _Label;
        /** 表单标签实例 */
        type LabelInstance = _LabelInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 表单标签
         *
         * 用来改进表单组件的可用性
         *
         * 使用 for 属性找到对应的 id，或者将控件放在该标签下，当点击时，就会触发对应的控件
         *
         * For 优先级高于内部控件，内部有多个控件的时候默认触发第一个控件
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/label.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        label: _Label;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 表单标签
             *
             * 用来改进表单组件的可用性
             *
             * 使用 for 属性找到对应的 id，或者将控件放在该标签下，当点击时，就会触发对应的控件
             *
             * For 优先级高于内部控件，内部有多个控件的时候默认触发第一个控件
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/label.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            label: _Label;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 表单标签
             *
             * 用来改进表单组件的可用性
             *
             * 使用 for 属性找到对应的 id，或者将控件放在该标签下，当点击时，就会触发对应的控件
             *
             * For 优先级高于内部控件，内部有多个控件的时候默认触发第一个控件
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/label.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            label: _Label;
        }
    }
}

type _PickerViewValueElement = number;
/** 依次表示 picker-view 内 picker-view-column 选择的下标 */
type _PickerViewValue = _PickerViewValueElement[];
interface _PickerViewOnChangeDetail {
    value: _PickerViewValue;
}
type _PickerViewOnChangeEvent = _CustomEvent<_PickerViewOnChangeDetail>;
/** Value 改变时触发 */
type _PickerViewOnChange = (event: _PickerViewOnChangeEvent) => void;
type _PickerViewOnPickstartEvent = _BaseEvent;
/** 滚动选择开始时触发 */
type _PickerViewOnPickstart = (event: _PickerViewOnPickstartEvent) => void;
type _PickerViewOnPickendEvent = _BaseEvent;
/** 滚动选择结束时触发 */
type _PickerViewOnPickend = (event: _PickerViewOnPickendEvent) => void;
type _PickerViewProps = CommonProps & Partial<{
    /**
     * 依次表示 picker-view 内 picker-view-column 选择的下标
     *
     * 超出 picker-view-column 可选项长度时，选择最后一项
     */
    value: _PickerViewValue;
    /** 设置选择器中间选中框的样式 */
    indicatorStyle: string;
    /** 设置选择器中间选中框的类名 */
    indicatorClass: string;
    /** 设置蒙层的样式 */
    maskStyle: string;
    /** 设置蒙层的类名 */
    maskClass: string;
    /**
     * 是否在手指松开时立即触发 change 事件
     *
     * 若不开启则会在滚动动画结束后触发 change 事件
     *
     * 默认为 false
     */
    immediateChange: boolean;
    /** Value 改变时触发 */
    onChange: _PickerViewOnChange;
    /** 滚动选择开始时触发 */
    onPickstart: _PickerViewOnPickstart;
    /** 滚动选择结束时触发 */
    onPickend: _PickerViewOnPickend;
}>;
/** 嵌入页面的滚动选择器，比 picker 更灵活 */
type _PickerView = DefineComponent<_PickerViewProps>;
/** 嵌入页面的滚动选择器 */
type _PickerViewInstance = InstanceType<_PickerView>;

declare global {
    namespace UniHelper {
        type PickerViewValueElement = _PickerViewValueElement;
        /** 依次表示 picker-view 内 picker-view-column 选择的下标 */
        type PickerViewValue = _PickerViewValue;
        interface PickerViewOnChangeDetail extends _PickerViewOnChangeDetail {
        }
        type PickerViewOnChangeEvent = _PickerViewOnChangeEvent;
        /** Value 改变时触发 */
        interface PickerViewOnChange extends _PickerViewOnChange {
        }
        type PickerViewOnPickstartEvent = _PickerViewOnPickstartEvent;
        /** 滚动选择开始时触发 */
        interface PickerViewOnPickstart extends _PickerViewOnPickstart {
        }
        type PickerViewOnPickendEvent = _PickerViewOnPickendEvent;
        /** 滚动选择结束时触发 */
        interface PickerViewOnPickend extends _PickerViewOnPickend {
        }
        type PickerViewProps = _PickerViewProps;
        /** 嵌入页面的滚动选择器，比 picker 更灵活 */
        type PickerView = _PickerView;
        /** 嵌入页面的滚动选择器实例 */
        type PickerViewInstance = _PickerViewInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 嵌入页面的滚动选择器，比 picker 更灵活
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/picker-view.html#picker-view)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        PickerView: _PickerView;
    }
}

type _PickerViewColumnProps = CommonProps & Partial<{}>;
type _PickerViewColumn = DefineComponent<_PickerViewColumnProps>;
type _PickerViewColumnInstance = InstanceType<_PickerViewColumn>;

declare global {
    namespace UniHelper {
        type PickerViewColumnProps = _PickerViewColumnProps;
        type PickerViewColumn = _PickerViewColumn;
        type PickerViewColumnInstance = _PickerViewColumnInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** `<picker-view />` 的子组件，仅可放置于 `<picker-view />` 中
         *
         * 其子节点的高度会自动设置成与 `<picker-view>` 的选中框的高度一致。
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/picker-view.html#picker-view-column)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        PickerViewColumn: _PickerViewColumn;
    }
}

interface _RadioGroupOnChangeDetail {
    value: _RadioValue;
}
type _RadioGroupOnChangeEvent = _CustomEvent<_RadioGroupOnChangeDetail>;
/** 选中项发生变化时触发 */
type _RadioGroupOnChange = (event: _RadioGroupOnChangeEvent) => void;
/** 单项选择器属性 */
type _RadioGroupProps = CommonProps & Partial<{
    /** 选中项发生变化时触发 */
    onChange: _RadioGroupOnChange;
}>;
/**
 * 单项选择器，内部由多个 radio 组成
 *
 * 通过把多个 radio 包裹在一个 radio-group 下，实现这些 radio 的单选
 */
type _RadioGroup = DefineComponent<_RadioGroupProps>;
/** 单项选择器实例 */
type _RadioGroupInstance = InstanceType<_RadioGroup>;

declare global {
    namespace UniHelper {
        interface RadioGroupOnChangeDetail extends _RadioGroupOnChangeDetail {
        }
        type RadioGroupOnChangeEvent = _RadioGroupOnChangeEvent;
        /** 选中项发生变化时触发 */
        interface RadioGroupOnChange extends _RadioGroupOnChange {
        }
        /** 单项选择器属性 */
        type RadioGroupProps = _RadioGroupProps;
        /**
         * 单项选择器，内部由多个 radio 组成
         *
         * 通过把多个 radio 包裹在一个 radio-group 下，实现这些 radio 的单选
         */
        type RadioGroup = _RadioGroup;
        /** 单项选择器实例 */
        type RadioGroupInstance = _RadioGroupInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 单项选择器，内部由多个 radio 组成
         *
         * 通过把多个 radio 包裹在一个 radio-group 下，实现这些 radio 的单选
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/radio.html#radio-group)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        RadioGroup: _RadioGroup;
    }
}

/** 输入框内容 */
type _TextareaValue = string;
/**
 * 设置键盘右下角按钮的文字
 *
 * Send 发送
 *
 * Search 搜索
 *
 * Next 下一个
 *
 * Go 前往
 *
 * Done 完成
 */
type _TextareaConfirmType = "send" | "search" | "next" | "go" | "done";
interface _TextareaOnFocusDetail {
    value: _TextareaValue;
    /** 键盘高度 */
    height?: number;
}
type _TextareaOnFocusEvent = _CustomEvent<_TextareaOnFocusDetail>;
/** 聚焦时触发 */
type _TextareaOnFocus = (event: _TextareaOnFocusEvent) => void;
interface _TextareaOnBlurDetail {
    value: _TextareaValue;
    /** 光标位置 */
    cursor?: number;
}
type _TextareaOnBlurEvent = _CustomEvent<_TextareaOnBlurDetail>;
/** 失焦时触发 */
type _TextareaOnBlur = (event: _TextareaOnBlurEvent) => void;
interface _TextareaOnLinechangeDetail {
    height: number;
    heightRpx: number;
    lineCount: number;
}
type _TextareaOnLinechangeEvent = _CustomEvent<_TextareaOnLinechangeDetail>;
/** 输入框行数变化时触发 */
type _TextareaOnLinechange = (event: _TextareaOnLinechangeEvent) => void;
interface _TextareaOnInputDetail {
    value: _TextareaValue;
    cursor: number;
}
type _TextareaOnInputEvent = _CustomEvent<_TextareaOnInputDetail>;
/** 输入时触发 */
type _TextareaOnInput = (event: _TextareaOnInputEvent) => string | void;
interface _TextareaOnConfirmDetail {
    value: _TextareaValue;
}
type _TextareaOnConfirmEvent = _CustomEvent<_TextareaOnConfirmDetail>;
/** 点击完成按钮时触发 */
type _TextareaOnConfirm = (event: _TextareaOnConfirmEvent) => void;
interface _TextareaOnKeyboardheightchangeDetail {
    height: number;
    duration: number;
}
type _TextareaOnKeyboardheightchangeEvent = _CustomEvent<_TextareaOnKeyboardheightchangeDetail>;
/** 键盘高度变化时触发 */
type _TextareaOnKeyboardheightchange = (event: _TextareaOnKeyboardheightchangeEvent) => void;
/** 多行输入框属性 */
type _TextareaProps = CommonProps & Partial<{
    /** 输入框的内容 */
    value: string;
    /** 输入框为空时占位符 */
    placeholder: string;
    /** 指定 placeholder 的样式 */
    placeholderStyle: string;
    /**
     * 指定 placeholder 的样式类
     *
     * 默认为 textarea-placeholder
     */
    placeholderClass: string;
    /**
     * 是否禁用
     *
     * 默认为 false
     */
    disabled: boolean;
    /**
     * 最大输入长度，设置为 -1 的时候不限制最大长度
     *
     * 默认为 140
     */
    maxlength: number;
    /**
     * 是否获取焦点
     *
     * 默认为 false
     */
    focus: boolean;
    /**
     * 是否自动聚焦，拉起键盘
     *
     * 默认为 false
     */
    autoFocus: boolean;
    /**
     * 是否自动增高
     *
     * 设置时，样式里的 height 不生效
     *
     * 默认为 false
     */
    autoHeight: boolean;
    /**
     * 如果 textarea 在 position: fixed 的区域内，需要指定为 true
     *
     * 默认为 false
     */
    fixed: boolean;
    /**
     * 指定光标与键盘的距离
     *
     * 取 textarea 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离
     *
     * 单位为 px
     *
     * 默认为 0
     */
    cursorSpacing: number;
    /** 指定 focus 时的光标位置 */
    cursor: number;
    /**
     * 设置键盘右下角按钮的文字
     *
     * Send 发送
     *
     * Search 搜索
     *
     * Next 下一个
     *
     * Go 前往
     *
     * Done 完成
     *
     * 默认为 done
     */
    confirmType: _TextareaConfirmType;
    /**
     * 点击键盘右下角按钮时是否保持键盘不收起
     *
     * 默认为 false
     */
    confirmHold: boolean;
    /**
     * 是否显示键盘上方带有”完成“按钮那一栏
     *
     * 默认为 true
     */
    showConfirmBar: boolean;
    /**
     * 光标起始位置，自动聚焦时有效，需与 selection-end 搭配使用
     *
     * 默认为 -1
     */
    selectionStart: number;
    /**
     * 光标结束位置，自动聚焦时有效，需与 selection-start 搭配使用
     *
     * 默认为 -1
     */
    selectionEnd: number;
    /**
     * 键盘弹起时，是否自动上推页面
     *
     * 默认为 true
     */
    adjustPosition: boolean;
    /**
     * 是否去掉 iOS 下的默认内边距
     *
     * 默认为 false
     */
    disableDefaultPadding: boolean;
    /**
     * 聚焦时点击页面的时候是否不收起键盘
     *
     * 默认为 false
     */
    holdKeyboard: boolean;
    /**
     * 键盘收起时是否自动失焦
     *
     * 默认为 false
     */
    autoBlur: boolean;
    /**
     * 是否忽略组件内对文本合成系统事件的处理
     *
     * 为 false 时将触发 compositionstart、compositionend、compositionupdate
     * 事件，且在文本合成期间会触发 input 事件
     *
     * 默认为 true
     */
    ignoreCompositionEvent: boolean;
    /** 聚焦时触发 */
    onFocus: _TextareaOnFocus;
    /** 失焦时触发 */
    onBlur: _TextareaOnBlur;
    /** 输入框行数变化时触发 */
    onLinechange: _TextareaOnLinechange;
    /** 输入时触发 */
    onInput: _TextareaOnInput;
    /** 点击完成按钮时触发 */
    onConfirm: _TextareaOnConfirm;
    /** 键盘高度变化时触发 */
    onKeyboardheightchange: _TextareaOnKeyboardheightchange;
}>;
/** 多行输入框 */
type _Textarea = DefineComponent<_TextareaProps>;
/** 多行输入框实例 */
type _TextareaInstance = InstanceType<_Textarea>;

declare global {
    namespace UniHelper {
        /** 输入框内容 */
        type TextareaValue = _TextareaValue;
        /**
         * 设置键盘右下角按钮的文字
         *
         * Send 发送
         *
         * Search 搜索
         *
         * Next 下一个
         *
         * Go 前往
         *
         * Done 完成
         */
        type TextareaConfirmType = _TextareaConfirmType;
        interface TextareaOnFocusDetail extends _TextareaOnFocusDetail {
        }
        type TextareaOnFocusEvent = _TextareaOnFocusEvent;
        /** 聚焦时触发 */
        interface TextareaOnFocus extends _TextareaOnFocus {
        }
        interface TextareaOnBlurDetail extends _TextareaOnBlurDetail {
        }
        type TextareaOnBlurEvent = _TextareaOnBlurEvent;
        /** 失焦时触发 */
        interface TextareaOnBlur extends _TextareaOnBlur {
        }
        interface TextareaOnLinechangeDetail extends _TextareaOnLinechangeDetail {
        }
        type TextareaOnLinechangeEvent = _TextareaOnLinechangeEvent;
        /** 输入框行数变化时触发 */
        interface TextareaOnLinechange extends _TextareaOnLinechange {
        }
        interface TextareaOnInputDetail extends _TextareaOnInputDetail {
        }
        type TextareaOnInputEvent = _TextareaOnInputEvent;
        /** 输入时触发 */
        interface TextareaOnInput extends _TextareaOnInput {
        }
        interface TextareaOnConfirmDetail extends _TextareaOnConfirmDetail {
        }
        type TextareaOnConfirmEvent = _TextareaOnConfirmEvent;
        /** 点击完成按钮时触发 */
        interface TextareaOnConfirm extends _TextareaOnConfirm {
        }
        interface TextareaOnKeyboardheightchangeDetail extends _TextareaOnKeyboardheightchangeDetail {
        }
        type TextareaOnKeyboardheightchangeEvent = _TextareaOnKeyboardheightchangeEvent;
        /** 键盘高度变化时触发 */
        interface TextareaOnKeyboardheightchange extends _TextareaOnKeyboardheightchange {
        }
        /** 多行输入框属性 */
        type TextareaProps = _TextareaProps;
        /** 多行输入框 */
        type Textarea = _Textarea;
        /** 多行输入框实例 */
        type TextareaInstance = _TextareaInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 多行输入框
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/textarea.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        textarea: _Textarea;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 多行输入框
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/textarea.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            textarea: _Textarea;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 多行输入框
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/textarea.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            textarea: _Textarea;
        }
    }
}

/**
 * 跳转方式
 *
 * Navigate 对应 navigateTo
 *
 * Redirect 对应 redirectTo
 *
 * SwitchTab 对应 switchTab
 *
 * ReLaunch 对应 reLaunch
 *
 * NavigateBack 对应 navigateBack
 *
 * Exit 退出小程序，target="miniProgram"时生效
 */
type _NavigatorOpenType = "navigate" | "redirect" | "switchTab" | "reLaunch" | "navigateBack" | "exit";
/**
 * 窗口的显示/关闭的动画类型
 *
 * Open-type="navigateTo" 或 open-type="navigateBack" 时有效
 *
 * 默认为 pop-in 显示、pop-out 关闭
 */
type _NavigatorAnimationType = "slide-in-right" | "slide-out-right" | "slide-in-left" | "slide-out-left" | "slide-in-top" | "slide-out-top" | "slide-in-bottom" | "slide-out-bottom" | "pop-in" | "pop-out" | "fade-in" | "fade-out" | "zoom-in" | "zoom-out" | "zoom-fade-in" | "zoom-fade-out" | "none";
/**
 * 在哪个目标上发生跳转
 *
 * Self 当前小程序
 *
 * MiniProgram 其它小程序
 */
type _NavigatorTarget = "self" | "miniProgram";
/**
 * 要打开的小程序版本
 *
 * 如果当前小程序是正式版，则打开的小程序必定是正式版
 *
 * Develop 开发版
 *
 * Trial 体验版
 *
 * Release 正式版
 *
 * Target="miniProgram" 时有效
 *
 * 默认为 release
 */
type _NavigatorVersion = "develop" | "trial" | "release";
/** 页面跳转属性 */
type _NavigatorProps = CommonProps & Partial<{
    /**
     * 应用内的跳转链接
     *
     * 值为相对路径或绝对路径
     *
     * 例子：../first/first、/pages/first/first
     */
    url: string;
    /**
     * 跳转方式
     *
     * Navigate 对应 navigateTo
     *
     * Redirect 对应 redirectTo
     *
     * SwitchTab 对应 switchTab
     *
     * ReLaunch 对应 reLaunch
     *
     * NavigateBack 对应 navigateBack
     *
     * Exit 退出小程序，target="miniProgram"时生效
     *
     * 默认为 navigate
     */
    openType: _NavigatorOpenType;
    /**
     * 回退的层数
     *
     * Open-type="navigateBack" 时有效
     *
     * 默认为 1
     */
    delta: number;
    /**
     * 窗口的显示/关闭的动画类型
     *
     * Open-type="navigateTo" 或 open-type="navigateBack" 时有效
     *
     * 默认为 pop-in 显示、pop-out 关闭
     */
    animationType: _NavigatorAnimationType;
    /**
     * 窗口的显示/关闭动画的持续时间
     *
     * Open-type="navigateTo" 或 open-type="navigateBack" 时有效
     *
     * 默认为 300
     */
    animationDuration: number;
    /**
     * 指定点击时的样式类
     *
     * Hover-class="none" 时，没有点击态效果
     *
     * 默认为 navigator-hover
     */
    hoverClass: string;
    /**
     * 指定是否阻止本节点的祖先节点出现点击态
     *
     * 默认为 false
     */
    hoverStopPropagation: boolean;
    /**
     * 按住后多久出现点击态
     *
     * 单位为 ms
     *
     * 默认为 50
     */
    hoverStartTime: number;
    /**
     * 手指松开后点击态保留时间
     *
     * 单位为 ms
     *
     * 默认为 600
     */
    hoverStayTime: number;
    /**
     * 在哪个目标上发生跳转
     *
     * Self 当前小程序
     *
     * MiniProgram 其它小程序
     *
     * 默认为 self
     */
    target: _NavigatorTarget;
    /**
     * 要打开的小程序 appId
     *
     * Target="miniProgram" 时有效
     */
    appId: string;
    /**
     * 打开的页面路径，如果为空则打开首页
     *
     * Target="miniProgram" 时有效
     */
    path: string;
    /**
     * 需要传递给目标应用的数据
     *
     * Target="miniProgram" 时有效
     */
    extraData: Record<string, any>;
    /**
     * 要打开的小程序版本
     *
     * 如果当前小程序是正式版，则打开的小程序必定是正式版
     *
     * Develop 开发版
     *
     * Trial 体验版
     *
     * Release 正式版
     *
     * Target="miniProgram" 时有效
     *
     * 默认为 release
     */
    version: _NavigatorVersion;
    /**
     * 当传递该参数后，可以不传 app-id 和 path
     *
     * Target="miniProgram" 时有效
     */
    shortLink: string;
}>;
/**
 * 页面跳转组件
 *
 * 该组件类似 HTML 中的 a 组件，但只能跳转本地页面
 *
 * 目标页面必须在 pages.json 中注册
 */
type _Navigator = DefineComponent<_NavigatorProps>;
/** 页面跳转组件实例 */
type _NavigatorInstance = InstanceType<_Navigator>;

declare global {
    namespace UniHelper {
        /**
         * 跳转方式
         *
         * Navigate 对应 navigateTo
         *
         * Redirect 对应 redirectTo
         *
         * SwitchTab 对应 switchTab
         *
         * ReLaunch 对应 reLaunch
         *
         * NavigateBack 对应 navigateBack
         *
         * Exit 退出小程序，target="miniProgram"时生效
         */
        type NavigatorOpenType = _NavigatorOpenType;
        /**
         * 窗口的显示/关闭的动画类型
         *
         * Open-type="navigateTo" 或 open-type="navigateBack" 时有效
         *
         * 默认为 pop-in 显示、pop-out 关闭
         */
        type NavigatorAnimationType = _NavigatorAnimationType;
        /**
         * 在哪个目标上发生跳转
         *
         * Self 当前小程序
         *
         * MiniProgram 其它小程序
         */
        type NavigatorTarget = _NavigatorTarget;
        /**
         * 要打开的小程序版本
         *
         * 如果当前小程序是正式版，则打开的小程序必定是正式版
         *
         * Develop 开发版
         *
         * Trial 体验版
         *
         * Release 正式版
         *
         * Target="miniProgram" 时有效
         *
         * 默认为 release
         */
        type NavigatorVersion = _NavigatorVersion;
        /** 页面跳转属性 */
        type NavigatorProps = _NavigatorProps;
        /**
         * 页面跳转组件
         *
         * 该组件类似 HTML 中的 a 组件，但只能跳转本地页面
         *
         * 目标页面必须在 pages.json 中注册
         */
        type Navigator = _Navigator;
        /** 页面跳转组件实例 */
        type NavigatorInstance = _NavigatorInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 页面跳转组件
         *
         * 该组件类似 HTML 中的 a 组件，但只能跳转本地页面
         *
         * 目标页面必须在 pages.json 中注册
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/navigator.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        navigator: _Navigator;
    }
}

interface _AudioOnErrorDetail {
    /**
     * 错误码
     *
     * 1 获取资源被用户禁止
     *
     * 2 网络错误
     *
     * 3 解码错误
     *
     * 4 不合适资源
     */
    errMsg: 1 | 2 | 3 | 4;
}
type _AudioOnErrorEvent = _CustomEvent<_AudioOnErrorDetail>;
/** 发生错误时触发 */
type _AudioOnError = (event: _AudioOnErrorEvent) => void;
type _AudioOnPlayEvent = _BaseEvent;
/** 开始/继续播放时触发 */
type _AudioOnPlay = (event: _AudioOnPlayEvent) => void;
type _AudioOnPauseEvent = _BaseEvent;
/** 暂停播放时触发 */
type _AudioOnPause = (event: _AudioOnPauseEvent) => void;
interface _AudioOnTimeupdateDetail {
    currentTime: number;
    duration: number;
}
type _AudioOnTimeupdateEvent = _CustomEvent<_AudioOnTimeupdateDetail>;
/** 播放进度改变时触发 */
type _AudioOnTimeupdate = (event: _AudioOnTimeupdateEvent) => void;
type _AudioOnEndedEvent = _BaseEvent;
/** 播放到末尾时触发 */
type _AudioOnEnded = (event: _AudioOnEndedEvent) => void;
/** 音频属性 */
type _AudioProps = CommonProps & Partial<{
    /** Audio 组件的唯一标识符 */
    id: string;
    /** 要播放音频的资源地址 */
    src: string;
    /**
     * 是否循环播放
     *
     * 默认为 false
     */
    loop: boolean;
    /**
     * 是否显示默认控件
     *
     * 默认为 false
     */
    controls: boolean;
    /**
     * 默认控件上的音频封面的图片资源地址
     *
     * 如果 controls 值为 false 则无效
     */
    poster: string;
    /**
     * 默认控件上的音频名字
     *
     * 如果 controls 值为 false 则无效
     *
     * 默认为“未知音频”
     */
    name: string;
    /**
     * 默认控件上的作者名字
     *
     * 如果 controls 值为 false 则无效
     *
     * 默认为“未知作者”
     */
    author: string;
    /** 发生错误时触发 */
    onError: _AudioOnError;
    /** 开始/继续播放时触发 */
    onPlay: _AudioOnPlay;
    /** 暂停播放时触发 */
    onPause: _AudioOnPause;
    /** 播放进度改变时触发 */
    onTimeupdate: _AudioOnTimeupdate;
    /** 播放到末尾时触发 */
    onEnded: _AudioOnEnded;
}>;
/** 音频 */
type _Audio = DefineComponent<_AudioProps>;
/** 音频实例 */
type _AudioInstance = InstanceType<_Audio>;

declare global {
    namespace UniHelper {
        interface AudioOnErrorDetail extends _AudioOnErrorDetail {
        }
        type AudioOnErrorEvent = _AudioOnErrorEvent;
        /** 发生错误时触发 */
        interface AudioOnError extends _AudioOnError {
        }
        type AudioOnPlayEvent = _AudioOnPlayEvent;
        /** 开始/继续播放时触发 */
        interface AudioOnPlay extends _AudioOnPlay {
        }
        type AudioOnPauseEvent = _AudioOnPauseEvent;
        /** 暂停播放时触发 */
        interface AudioOnPause extends _AudioOnPause {
        }
        interface AudioOnTimeupdateDetail extends _AudioOnTimeupdateDetail {
        }
        type AudioOnTimeupdateEvent = _AudioOnTimeupdateEvent;
        /** 播放进度改变时触发 */
        interface AudioOnTimeupdate extends _AudioOnTimeupdate {
        }
        type AudioOnEndedEvent = _AudioOnEndedEvent;
        /** 播放到末尾时触发 */
        interface AudioOnEnded extends _AudioOnEnded {
        }
        /** 音频属性 */
        type AudioProps = _AudioProps;
        /** 音频 */
        type Audio = _Audio;
        /** 音频实例 */
        type AudioInstance = _AudioInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 音频
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/audio.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        audio: _Audio;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 音频
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/audio.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            audio: _Audio;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 音频
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/audio.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            audio: _Audio;
        }
    }
}

/**
 * 应用模式，不支持动态修改
 *
 * Normal 普通
 *
 * ScanCode 扫码
 */
type _CameraMode = "normal" | "scanCode";
/**
 * 分辨率，不支持动态修改
 *
 * Low 低
 *
 * Medium 中等
 *
 * High 高
 */
type _CameraResolution = "low" | "medium" | "high";
/**
 * 摄像头朝向
 *
 * Front 前置摄像头
 *
 * Back 后置摄像头
 */
type _CameraDevicePosition = "front" | "back";
/**
 * 闪光灯
 *
 * Auto 自动
 *
 * On 打开
 *
 * Off 关闭
 *
 * Torch 常亮
 */
type _CameraFlash = "auto" | "on" | "off" | "torch";
/**
 * 期望的相机帧数据尺寸
 *
 * Small 小
 *
 * Medium 中
 *
 * Large 大
 */
type _CameraFrameSize = "small" | "medium" | "large";
type _CameraOnStopEvent = _BaseEvent;
/** 摄像头在非正常终止时触发 */
type _CameraOnStop = (event: _CameraOnStopEvent) => void;
type _CameraOnErrorEvent = _BaseEvent;
/** 用户不允许使用摄像头时触发 */
type _CameraOnError = (event: _BaseEvent) => void;
interface _CameraOnInitdoneDetail {
    maxZoom: number;
}
type _CameraOnInitdoneEvent = _CustomEvent<_CameraOnInitdoneDetail>;
/** 相机初始化完成时触发 */
type _CameraOnInitdone = (event: _CameraOnInitdoneEvent) => void;
type _CameraOnScancodeEvent = _BaseEvent;
/**
 * 扫码识别成功时触发
 *
 * Mode="scanCode" 时有效
 */
type _CameraOnScancode = (event: _CameraOnScancodeEvent) => void;
/** 页面内嵌的区域相机组件属性 */
type _CameraProps = CommonProps & Partial<{
    /**
     * 应用模式，不支持动态修改
     *
     * Normal 普通
     *
     * ScanCode 扫码
     *
     * 默认为 normal
     */
    mode: _CameraMode;
    /**
     * 分辨率，不支持动态修改
     *
     * Low 低
     *
     * Medium 中等
     *
     * High 高
     *
     * 默认为 medium
     */
    resolution: _CameraResolution;
    /**
     * 摄像头朝向
     *
     * Front 前置摄像头
     *
     * Back 后置摄像头
     *
     * 默认为 back
     */
    devicePosition: _CameraDevicePosition;
    /**
     * 闪光灯
     *
     * Auto 自动
     *
     * On 打开
     *
     * Off 关闭
     *
     * Torch 常亮
     *
     * 默认为 auto
     */
    flash: _CameraFlash;
    /**
     * 期望的相机帧数据尺寸
     *
     * Small 小
     *
     * Medium 中
     *
     * Large 大
     *
     * 默认为 medium
     */
    frameSize: _CameraFrameSize;
    /** 摄像头在非正常终止时触发 */
    onStop: _CameraOnStop;
    /** 用户不允许使用摄像头时触发 */
    onError: _CameraOnError;
    /** 相机初始化完成时触发 */
    onInitdone: _CameraOnInitdone;
    /**
     * 扫码识别成功时触发
     *
     * Mode="scanCode" 时有效
     */
    onScancode: _CameraOnScancode;
}>;
/** 页面内嵌的区域相机组件 */
type _Camera = DefineComponent<_CameraProps>;
/** 页面内嵌的区域相机组件实例 */
type _CameraInstance = InstanceType<_Camera>;

declare global {
    namespace UniHelper {
        /**
         * 应用模式，不支持动态修改
         *
         * Normal 普通
         *
         * ScanCode 扫码
         */
        type CameraMode = _CameraMode;
        /**
         * 分辨率，不支持动态修改
         *
         * Low 低
         *
         * Medium 中等
         *
         * High 高
         */
        type CameraResolution = _CameraResolution;
        /**
         * 摄像头朝向
         *
         * Front 前置摄像头
         *
         * Back 后置摄像头
         */
        type CameraDevicePosition = _CameraDevicePosition;
        /**
         * 闪光灯
         *
         * Auto 自动
         *
         * On 打开
         *
         * Off 关闭
         *
         * Torch 常亮
         */
        type CameraFlash = _CameraFlash;
        /**
         * 期望的相机帧数据尺寸
         *
         * Small 小
         *
         * Medium 中
         *
         * Large 大
         */
        type CameraFrameSize = _CameraFrameSize;
        type CameraOnStopEvent = _CameraOnStopEvent;
        /** 摄像头在非正常终止时触发 */
        interface CameraOnStop extends _CameraOnStop {
        }
        type CameraOnErrorEvent = _CameraOnErrorEvent;
        /** 用户不允许使用摄像头时触发 */
        interface CameraOnError extends _CameraOnError {
        }
        interface CameraOnInitdoneDetail extends _CameraOnInitdoneDetail {
        }
        type CameraOnInitdoneEvent = _CameraOnInitdoneEvent;
        /** 相机初始化完成时触发 */
        interface CameraOnInitdone extends _CameraOnInitdone {
        }
        type CameraOnScancodeEvent = _CameraOnScancodeEvent;
        /**
         * 扫码识别成功时触发
         *
         * Mode="scanCode" 时有效
         */
        interface CameraOnScancode extends _CameraOnScancode {
        }
        /** 页面内嵌的区域相机组件属性 */
        type CameraProps = _CameraProps;
        /** 页面内嵌的区域相机组件 */
        type Camera = _Camera;
        /** 页面内嵌的区域相机组件实例 */
        type CameraInstance = _CameraInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 页面内嵌的区域相机组件
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/camera.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        camera: _Camera;
    }
}

/**
 * 图片裁剪、缩放的模式
 *
 * ScaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
 *
 * AspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来，可以完整地将图片显示出来
 *
 * AspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
 *
 * WidthFix 宽度不变，高度自动变化，保持原图宽高比不变
 *
 * HeightFix 高度不变，宽度自动变化，保持原图宽高比不变
 *
 * Top 不缩放图片，只显示图片的顶部区域
 *
 * Bottom 不缩放图片，只显示图片的底部区域
 *
 * Center 不缩放图片，只显示图片的中间区域
 *
 * Left 不缩放图片，只显示图片的左边区域
 *
 * Right 不缩放图片，只显示图片的右边区域
 *
 * Top left 不缩放图片，只显示图片的左上边区域
 *
 * Top right 不缩放图片，只显示图片的右上边区域
 *
 * Bottom left 不缩放图片，只显示图片的左下边区域
 *
 * Bottom right 不缩放图片，只显示图片的右下边区域
 */
type _ImageMode = "scaleToFill" | "aspectFit" | "aspectFill" | "widthFix" | "heightFix" | "top" | "bottom" | "center" | "left" | "right" | "top left" | "top right" | "bottom left" | "bottom right";
type _ImageOnErrorEvent = _BaseEvent;
/** 图片加载错误时触发 */
type _ImageOnError = (event: _ImageOnErrorEvent) => void;
interface _ImageOnLoadDetail {
    /**
     * 图片宽度
     *
     * 单位为 px
     */
    width: string;
    /**
     * 图片高度
     *
     * 单位为 px
     */
    height: string;
}
type _ImageOnLoadEvent = _CustomEvent<_ImageOnLoadDetail>;
/** 图片加载完毕时触发 */
type _ImageOnLoad = (event: _ImageOnLoadEvent) => void;
/** 图片属性 */
type _ImageProps = CommonProps & Partial<{
    /** 图片资源地址 */
    src: string;
    /**
     * 图片裁剪、缩放的模式
     *
     * ScaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
     *
     * AspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来，可以完整地将图片显示出来
     *
     * AspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
     *
     * WidthFix 宽度不变，高度自动变化，保持原图宽高比不变
     *
     * HeightFix 高度不变，宽度自动变化，保持原图宽高比不变
     *
     * Top 不缩放图片，只显示图片的顶部区域
     *
     * Bottom 不缩放图片，只显示图片的底部区域
     *
     * Center 不缩放图片，只显示图片的中间区域
     *
     * Left 不缩放图片，只显示图片的左边区域
     *
     * Right 不缩放图片，只显示图片的右边区域
     *
     * Top left 不缩放图片，只显示图片的左上边区域
     *
     * Top right 不缩放图片，只显示图片的右上边区域
     *
     * Bottom left 不缩放图片，只显示图片的左下边区域
     *
     * Bottom right 不缩放图片，只显示图片的右下边区域
     *
     * 默认为 scaleToFill
     */
    mode: _ImageMode;
    /**
     * 是否开启图片懒加载
     *
     * 只对 page 与 scroll-view 下的 image 有效
     *
     * 默认为 false
     */
    lazyLoad: boolean;
    /**
     * 是否使用图片显示动画效果
     *
     * 默认为 true
     */
    fadeShow: boolean;
    /**
     * 在系统不支持 webp 的情况下是否单独启用 webp
     *
     * 默认为 false
     */
    webp: boolean;
    /**
     * 是否开启长按图片显示识别小程序码菜单
     *
     * 默认为 false
     */
    showMenuByLongpress: boolean;
    /**
     * 是否能拖动图片
     *
     * 默认为 true
     */
    draggable: boolean;
    /** 图片加载错误时触发 */
    onError: _ImageOnError;
    /** 图片加载完毕时触发 */
    onLoad: _ImageOnLoad;
}>;
/** 图片 */
type _Image = DefineComponent<_ImageProps>;
/** 图片实例 */
type _ImageInstance = InstanceType<_Image>;

declare global {
    namespace UniHelper {
        /**
         * 图片裁剪、缩放的模式
         *
         * ScaleToFill 不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素
         *
         * AspectFit 保持纵横比缩放图片，使图片的长边能完全显示出来，可以完整地将图片显示出来
         *
         * AspectFill 保持纵横比缩放图片，只保证图片的短边能完全显示出来，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
         *
         * WidthFix 宽度不变，高度自动变化，保持原图宽高比不变
         *
         * HeightFix 高度不变，宽度自动变化，保持原图宽高比不变
         *
         * Top 不缩放图片，只显示图片的顶部区域
         *
         * Bottom 不缩放图片，只显示图片的底部区域
         *
         * Center 不缩放图片，只显示图片的中间区域
         *
         * Left 不缩放图片，只显示图片的左边区域
         *
         * Right 不缩放图片，只显示图片的右边区域
         *
         * Top left 不缩放图片，只显示图片的左上边区域
         *
         * Top right 不缩放图片，只显示图片的右上边区域
         *
         * Bottom left 不缩放图片，只显示图片的左下边区域
         *
         * Bottom right 不缩放图片，只显示图片的右下边区域
         */
        type ImageMode = _ImageMode;
        type ImageOnErrorEvent = _ImageOnErrorEvent;
        /** 图片加载错误时触发 */
        interface ImageOnError extends _ImageOnError {
        }
        interface ImageOnLoadDetail extends _ImageOnLoadDetail {
        }
        type ImageOnLoadEvent = _ImageOnLoadEvent;
        /** 图片加载完毕时触发 */
        interface ImageOnLoad extends _ImageOnLoad {
        }
        /** 图片属性 */
        type ImageProps = _ImageProps;
        /** 图片 */
        type Image = _Image;
        /** 图片实例 */
        type ImageInstance = _ImageInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 图片
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/image.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        image: _Image;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 图片
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/image.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            image: _Image;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 图片
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/image.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            image: _Image;
        }
    }
}

/** 弹幕 */
interface _VideoDanmu {
    /** 弹幕文本 */
    text: string;
    /** 弹幕颜色 */
    color: string;
    /**
     * 弹幕出现时间
     *
     * 单位为 s
     */
    time: number;
}
/**
 * 设置全屏时视频的方向，不指定则根据宽高比自动判断
 *
 * 0 正常竖向
 *
 * 90 屏幕逆时针 90 度
 *
 * -90 屏幕顺时针 90 度
 */
type _VideoDirection = 0 | 90 | -90;
/**
 * 当视频大小与 video 容器大小不一致时，视频的表现形式
 *
 * Contain 包含
 *
 * Fill 填充
 *
 * Cover 覆盖
 */
type _VideoObjectFit = "contain" | "fill" | "cover";
/**
 * 播放按钮的位置
 *
 * Bottom 控制栏上
 *
 * Center 视频中间
 */
type _VideoPlayBtnPosition = "bottom" | "center";
/**
 * 解码器选择
 *
 * Hardware 硬件解码
 *
 * Software 软件解码
 */
type _VideoCodec = "hardware" | "software";
/**
 * 移动网络提醒样式
 *
 * 0 不提醒
 *
 * 1 提醒
 */
type _VideoMobilenetHintType = 0 | 1;
/**
 * 播放策略
 *
 * 0 普通模式，适合绝大部分视频播放场景
 *
 * 1 平滑播放模式（降级），增加缓冲区大小，采用 open sl
 * 解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等，适用于高码率视频的极端场景
 *
 * 2 M3U8 优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度，适用于 M3U8 在线播放的场景
 */
type _VideoPlayStrategy = 0 | 1 | 2;
type _VideoOnPlayEvent = _BaseEvent;
/** 开始/继续播放时触发 */
type _VideoOnPlay = (event: _VideoOnPlayEvent) => void;
type _VideoOnPauseEvent = _BaseEvent;
/** 暂停播放时触发 */
type _VideoOnPause = (event: _VideoOnPauseEvent) => void;
type _VideoOnEndedEvent = _BaseEvent;
/** 播放到末尾时触发 */
type _VideoOnEnded = (event: _VideoOnEndedEvent) => void;
interface _VideoOnTimeupdateDetail {
    currentTime: number;
    duration: number;
}
type _VideoOnTimeupdateEvent = _CustomEvent<_VideoOnTimeupdateDetail>;
/**
 * 播放进度变化时触发
 *
 * 250ms 一次
 */
type _VideoOnTimeupdate = (event: _VideoOnTimeupdateEvent) => void;
interface _VideoOnFullscreenchangeDetail {
    fullScreen: boolean;
    direction: _VideoDirection;
}
type _VideoOnFullscreenchangeEvent = _CustomEvent<_VideoOnFullscreenchangeDetail>;
/** 视频进入和退出全屏时触发 */
type _VideoOnFullscreenchange = (event: _VideoOnFullscreenchangeEvent) => void;
type _VideoOnWaitingEvent = _BaseEvent;
/** 视频缓冲时触发 */
type _VideoOnWaiting = (event: _VideoOnWaitingEvent) => void;
type _VideoOnErrorEvent = _BaseEvent;
/** 视频播放出错时触发 */
type _VideoOnError = (event: _VideoOnErrorEvent) => void;
interface _VideoOnProgressDetail {
    buffered: number;
}
type _VideoOnProgressEvent = _CustomEvent<_VideoOnProgressDetail>;
/** 加载进度变化时触发 */
type _VideoOnProgress = (event: _VideoOnProgressEvent) => void;
type _VideoOnLoadeddataEvent = _BaseEvent;
/** 视频资源开始加载时触发 */
type _VideoOnLoadeddata = (event: _VideoOnLoadeddataEvent) => void;
type _VideoOnLoadstartEvent = _BaseEvent;
/** 开始加载数据时触发 */
type _VideoOnLoadstart = (event: _VideoOnLoadstartEvent) => void;
type _VideoOnSeekedEvent = _BaseEvent;
/** 拖动进度条结束时触发 */
type _VideoOnSeeked = (event: _VideoOnSeekedEvent) => void;
type _VideoOnSeekingEvent = _BaseEvent;
/** 拖动进度条时触发 */
type _VideoOnSeeking = (event: _VideoOnSeekingEvent) => void;
interface _VideoOnLoadedmetadataDetail {
    width: number;
    height: number;
    duration: number;
}
type _VideoOnLoadedmetadataEvent = _CustomEvent<_VideoOnLoadedmetadataDetail>;
/** 视频元数据加载完成时触发 */
type _VideoOnLoadedmetadata = (event: _VideoOnLoadedmetadataEvent) => void;
interface _VideoOnFullscreenclickDetail {
    screenX: number;
    screenY: number;
    screenWidth: number;
    screenHeight: number;
}
type _VideoOnFullscreenclickEvent = _CustomEvent<_VideoOnFullscreenclickDetail>;
/** 视频播放全屏播放点击时触发 */
type _VideoOnFullscreenclick = (event: _VideoOnFullscreenclickEvent) => void;
interface _VideoOnControlstoggleDetail {
    show: boolean;
}
type _VideoOnControlstoggleEvent = _CustomEvent<_VideoOnControlstoggleDetail>;
/** 切换 controls 显示隐藏时触发 */
type _VideoOnControlstoggle = (event: _VideoOnControlstoggleEvent) => void;
/** 视频播放组件属性 */
type _VideoProps = CommonProps & Partial<{
    /** 要播放视频的资源地址 */
    src: string;
    /**
     * 是否自动播放
     *
     * 默认为 false
     */
    autoplay: boolean;
    /**
     * 是否循环播放
     *
     * 默认为 false
     */
    loop: boolean;
    /**
     * 是否静音播放
     *
     * 默认为 false
     */
    muted: boolean;
    /**
     * 指定视频初始播放位置
     *
     * 单位为 s
     */
    initialTime: number;
    /**
     * 指定视频长度
     *
     * 单位为 s
     */
    duration: number;
    /**
     * 是否显示默认播放控件（播放/暂停按钮、播放进度、时间）
     *
     * 默认为 true
     */
    controls: boolean;
    /** 弹幕列表 */
    danmuList: _VideoDanmu[];
    /**
     * 是否显示弹幕按钮，不支持动态修改
     *
     * 默认为 false
     */
    danmuBtn: boolean;
    /**
     * 是否展示弹幕，不支持动态修改
     *
     * 默认为 false
     */
    enableDanmu: boolean;
    /**
     * 在非全屏模式下，是否开启亮度与音量调节手势
     *
     * 默认为 false
     */
    pageGesture: boolean;
    /**
     * 设置全屏时视频的方向，不指定则根据宽高比自动判断
     *
     * 0 正常竖向
     *
     * 90 屏幕逆时针 90 度
     *
     * -90 屏幕顺时针 90 度
     *
     * 默认根据宽高比自动判断
     */
    direction: _VideoDirection;
    /**
     * 若不设置，宽度大于 240 时才会显示
     *
     * 默认为 true
     */
    showProgress: boolean;
    /**
     * 是否显示全屏按钮
     *
     * 默认为 true
     */
    showFullscreenBtn: boolean;
    /**
     * 是否显示视频底部控制栏的播放按钮
     *
     * 默认为 true
     */
    showPlayBtn: boolean;
    /**
     * 是否显示视频中间的播放按钮
     *
     * 默认为 true
     */
    showCenterPlayBtn: boolean;
    /**
     * 是否显示 loading 控件
     *
     * 默认为 true
     */
    showLoading: boolean;
    /**
     * 是否开启控制进度的手势
     *
     * 默认为 true
     */
    enableProgressGesture: boolean;
    /**
     * 当视频大小与 video 容器大小不一致时，视频的表现形式
     *
     * Contain 包含
     *
     * Fill 填充
     *
     * Cover 覆盖
     *
     * 默认为 contain
     */
    objectFit: _VideoObjectFit;
    /**
     * 视频封面的图片网络资源地址
     *
     * 如果 controls 值为 false 则无效
     */
    poster: string;
    /**
     * 是否显示静音按钮
     *
     * @decs 默认为 false
     */
    showMuteBtn: boolean;
    /** 视频的标题，全屏时在顶部展示 */
    title: string;
    /**
     * 播放按钮的位置
     *
     * Bottom 控制栏上
     *
     * Center 视频中间
     *
     * 默认为 bottom
     */
    playBtnPosition: _VideoPlayBtnPosition;
    /**
     * 移动网络提醒样式
     *
     * 0 不提醒
     *
     * 1 提醒
     *
     * 默认为 1
     */
    mobilenetHintType: _VideoMobilenetHintType;
    /**
     * 是否开启播放手势，即双击切换播放、暂停
     *
     * 默认为 false
     */
    enablePlayGesture: boolean;
    /**
     * 当跳转到其它小程序页面时，是否自动暂停本页面的视频
     *
     * 默认为 true
     */
    autoPauseIfNavigate: boolean;
    /**
     * 当跳转到其它微信原生页面时，是否自动暂停本页面的视频
     *
     * 默认为 true
     */
    autoPauseIfOpenNative: boolean;
    /**
     * 在非全屏模式下，是否开启亮度与音量调节手势（同 page-gesture）
     *
     * 默认为 false
     */
    vslideGesture: boolean;
    /**
     * 在全屏模式下，是否开启亮度与音量调节手势
     *
     * 默认为 true
     */
    vslideGestureInFullscreen: boolean;
    /** 视频前贴广告单元ID */
    adUnitId: string;
    /**
     * 用于给搜索等场景作为视频封面展示
     *
     * 建议使用无播放 icon 的视频封面图
     *
     * 只支持网络地址
     */
    posterForCrawler: string;
    /**
     * 解码器选择
     *
     * Hardware 硬件解码
     *
     * Software 软件解码
     *
     * 默认为 hardware
     */
    codec: _VideoCodec;
    /**
     * 是否对 http、https 视频源开启本地缓存
     *
     * 默认为 true
     */
    httpCache: boolean;
    /**
     * 播放策略
     *
     * 0 普通模式，适合绝大部分视频播放场景
     *
     * 1 平滑播放模式（降级），增加缓冲区大小，采用 open sl
     * 解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等，适用于高码率视频的极端场景
     *
     * 2 M3U8 优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度，适用于 M3U8 在线播放的场景
     *
     * 默认为 0
     */
    playStrategy: _VideoPlayStrategy;
    /** HTTP 请求 Header */
    header: Record<string, any>;
    /** 开始/继续播放时触发 */
    onPlay: _VideoOnPlay;
    /** 暂停播放时触发 */
    onPause: _VideoOnPause;
    /** 播放到末尾时触发 */
    onEnded: _VideoOnEnded;
    /**
     * 播放进度变化时触发
     *
     * 250ms 一次
     */
    onTimeupdate: _VideoOnTimeupdate;
    /** 视频进入和退出全屏时触发 */
    onFullscreenchange: _VideoOnFullscreenchange;
    /** 视频缓冲时触发 */
    onWaiting: _VideoOnWaiting;
    /** 视频播放出错时触发 */
    onError: _VideoOnError;
    /** 加载进度变化时触发 */
    onProgress: _VideoOnProgress;
    /** 视频资源开始加载时触发 */
    onLoadeddata: _VideoOnLoadeddata;
    /** 开始加载数据时触发 */
    onLoadstart: _VideoOnLoadstart;
    /** 拖动进度条结束时触发 */
    onSeeked: _VideoOnSeeked;
    /** 拖动进度条时触发 */
    onSeeking: _VideoOnSeeking;
    /** 视频元数据加载完成时触发 */
    onLoadedmetadata: _VideoOnLoadedmetadata;
    /** 视频播放全屏播放点击时触发 */
    onFullscreenclick: _VideoOnFullscreenclick;
    /** 切换 controls 显示隐藏时触发 */
    onControlstoggle: _VideoOnControlstoggle;
}>;
/**
 * 视频播放组件
 *
 * 默认宽度 300px、高度 225px，可通过 css 设置宽高
 */
type _Video = DefineComponent<_VideoProps>;
/** 视频播放组件实例 */
type _VideoInstance = InstanceType<_Video>;

declare global {
    namespace UniHelper {
        /** 弹幕 */
        interface VideoDanmu extends _VideoDanmu {
        }
        /**
         * 设置全屏时视频的方向，不指定则根据宽高比自动判断
         *
         * 0 正常竖向
         *
         * 90 屏幕逆时针 90 度
         *
         * -90 屏幕顺时针 90 度
         */
        type VideoDirection = _VideoDirection;
        /**
         * 当视频大小与 video 容器大小不一致时，视频的表现形式
         *
         * Contain 包含
         *
         * Fill 填充
         *
         * Cover 覆盖
         */
        type VideoObjectFit = _VideoObjectFit;
        /**
         * 播放按钮的位置
         *
         * Bottom 控制栏上
         *
         * Center 视频中间
         */
        type VideoPlayBtnPosition = _VideoPlayBtnPosition;
        /**
         * 解码器选择
         *
         * Hardware 硬件解码
         *
         * Software 软件解码
         */
        type VideoCodec = _VideoCodec;
        /**
         * 移动网络提醒样式
         *
         * 0 不提醒
         *
         * 1 提醒
         */
        type VideoMobilenetHintType = _VideoMobilenetHintType;
        /**
         * 播放策略
         *
         * 0 普通模式，适合绝大部分视频播放场景
         *
         * 1 平滑播放模式（降级），增加缓冲区大小，采用 open sl
         * 解码音频，避免音视频脱轨的问题，可能会降低首屏展现速度、视频帧率，出现开屏音频延迟等，适用于高码率视频的极端场景
         *
         * 2 M3U8 优化模式，增加缓冲区大小，提升视频加载速度和流畅度，可能会降低首屏展现速度，适用于 M3U8 在线播放的场景
         */
        type VideoPlayStrategy = _VideoPlayStrategy;
        type VideoOnPlayEvent = _VideoOnPlayEvent;
        /** 开始/继续播放时触发 */
        interface VideoOnPlay extends _VideoOnPlay {
        }
        type VideoOnPauseEvent = _VideoOnPauseEvent;
        /** 暂停播放时触发 */
        interface VideoOnPause extends _VideoOnPause {
        }
        type VideoOnEndedEvent = _VideoOnEndedEvent;
        /** 播放到末尾时触发 */
        interface VideoOnEnded extends _VideoOnEnded {
        }
        interface VideoOnTimeupdateDetail extends _VideoOnTimeupdateDetail {
        }
        type VideoOnTimeupdateEvent = _VideoOnTimeupdateEvent;
        /**
         * 播放进度变化时触发，
         *
         * 250ms 一次
         */
        interface VideoOnTimeupdate extends _VideoOnTimeupdate {
        }
        interface VideoOnFullscreenchangeDetail extends _VideoOnFullscreenchangeDetail {
        }
        type VideoOnFullscreenchangeEvent = _VideoOnFullscreenchangeEvent;
        /** 视频进入和退出全屏时触发 */
        interface VideoOnFullscreenchange extends _VideoOnFullscreenchange {
        }
        type VideoOnWaitingEvent = _VideoOnWaitingEvent;
        /** 视频缓冲时触发 */
        interface VideoOnWaiting extends _VideoOnWaiting {
        }
        type VideoOnErrorEvent = _VideoOnErrorEvent;
        /** 视频播放出错时触发 */
        interface VideoOnError extends _VideoOnError {
        }
        interface VideoOnProgressDetail extends _VideoOnProgressDetail {
        }
        type VideoOnProgressEvent = _VideoOnProgressEvent;
        /** 加载进度变化时触发 */
        interface VideoOnProgress extends _VideoOnProgress {
        }
        type VideoOnLoadeddataEvent = _VideoOnLoadeddataEvent;
        /** 视频资源开始加载时触发 */
        interface VideoOnLoadeddata extends _VideoOnLoadeddata {
        }
        type VideoOnLoadstartEvent = _VideoOnLoadstartEvent;
        /** 开始加载数据时触发 */
        interface VideoOnLoadstart extends _VideoOnLoadstart {
        }
        type VideoOnSeekedEvent = _VideoOnSeekedEvent;
        /** 拖动进度条结束时触发 */
        interface VideoOnSeeked extends _VideoOnSeeked {
        }
        type VideoOnSeekingEvent = _VideoOnSeekingEvent;
        /** 拖动进度条时触发 */
        interface VideoOnSeeking extends _VideoOnSeeking {
        }
        interface VideoOnLoadedmetadataDetail extends _VideoOnLoadedmetadataDetail {
        }
        type VideoOnLoadedmetadataEvent = _VideoOnLoadedmetadataEvent;
        /** 视频元数据加载完成时触发 */
        interface VideoOnLoadedmetadata extends _VideoOnLoadedmetadata {
        }
        interface VideoOnFullscreenclickDetail extends _VideoOnFullscreenclickDetail {
        }
        type VideoOnFullscreenclickEvent = _VideoOnFullscreenclickEvent;
        /** 视频播放全屏播放点击时触发 */
        interface VideoOnFullscreenclick extends _VideoOnFullscreenclick {
        }
        interface VideoOnControlstoggleDetail extends _VideoOnControlstoggleDetail {
        }
        type VideoOnControlstoggleEvent = _VideoOnControlstoggleEvent;
        /** 切换 controls 显示隐藏时触发 */
        interface VideoOnControlstoggle extends _VideoOnControlstoggle {
        }
        /** 视频播放组件属性 */
        type VideoProps = _VideoProps;
        /**
         * 视频播放组件
         *
         * 默认宽度 300px、高度 225px，可通过 css 设置宽高
         */
        type Video = _Video;
        /** 视频播放组件实例 */
        type VideoInstance = _VideoInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 视频播放组件
         *
         * 默认宽度 300px、高度 225px，可通过 css 设置宽高
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/video.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        video: _Video;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 视频播放组件
             *
             * 默认宽度 300px、高度 225px，可通过 css 设置宽高
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/video.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            video: _Video;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /**
             * 视频播放组件
             *
             * 默认宽度 300px、高度 225px，可通过 css 设置宽高
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/video.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            video: _Video;
        }
    }
}

/**
 * 实时模式
 *
 * RTC 实时通话，该模式时延更低
 *
 * @dec live 直播
 */
type _LivePlayerMode = "live" | "RTC";
/**
 * 画面方向
 *
 * Vertical 纵向
 *
 * Horizontal 横向
 */
type _LivePlayerOrientation = "vertical" | "horizontal";
/**
 * 填充模式
 *
 * Contain 图像长边填满屏幕，短边区域会被填充⿊⾊
 *
 * FillCrop 图像铺满屏幕，超出显示区域的部分将被截掉
 */
type _LivePlayerObjectFit = "contain" | "fillCrop";
/**
 * 声音输出方式
 *
 * Speaker 扬声器
 *
 * Ear 听筒
 *
 * 默认为 speaker
 */
type _LivePlayerSoundMode = "speaker" | "ear";
/**
 * 设置小窗模式
 *
 * Push 路由 push 时触发小窗
 *
 * Pop 路由 pop 时触发小窗
 */
type _LivePlayerPictureInPictureMode = "push" | "pop";
/**
 * 状态码
 *
 * 2001 已经连接服务器
 *
 * 2002 已经连接服务器，开始拉流
 *
 * 2003 网络接收到首个视频数据包 IDR
 *
 * 2004 视频播放开始
 *
 * 2005 视频播放进度
 *
 * 2006 视频播放结束
 *
 * 2007 视频播放 Loading
 *
 * 2008 解码器启动
 *
 * 2009 视频分辨率改变
 *
 * -2301 网络断连，且经多次重连抢救无效，更多重试请自行重启播放
 *
 * -2302 获取加速拉流地址失败
 *
 * 2101 当前视频帧解码失败
 *
 * 2102 当前音频帧解码失败
 *
 * 2103 网络断连, 已启动自动重连
 *
 * 2104 网络来包不稳，可能是下行带宽不足，或由于主播端出流不均匀
 *
 * 2105 当前视频播放出现卡顿
 *
 * 2106 硬解启动失败，采用软解
 *
 * 2107 当前视频帧不连续，可能丢帧
 *
 * 2108 当前流硬解第一个 I 帧失败，SDK 自动切软解
 *
 * 3001 RTMP - DNS解析失败
 *
 * 3002 RTMP 服务器连接失败
 *
 * 3003 RTMP 服务器握手失败
 *
 * 3005 RTMP 读/写失败
 */
type _LivePlayerCode = 2001 | 2002 | 2003 | 2004 | 2005 | 2006 | 2007 | 2008 | 2009 | -2301 | -2302 | 2101 | 2102 | 2103 | 2104 | 2105 | 2106 | 2107 | 2108 | 3001 | 3002 | 3003 | 3005;
/** 网络状态 */
interface _LivePlayerInfo {
    /**
     * 当前视频编/码器输出的比特率
     *
     * 单位为 kbps
     */
    videoBitrate?: number;
    /**
     * 当前音频编/码器输出的比特率
     *
     * 单位为 kbps
     */
    audioBitrate?: number;
    /** 当前视频帧率 */
    videoFPS?: number;
    /**
     * 当前视频 GOP，也就是每两个关键帧 I 帧间隔时长
     *
     * 单位为 s
     */
    videoGOP?: number;
    /** 当前的发送/接收速度 */
    netSpeed?: number;
    /** 网络抖动情况，抖动越大，网络越不稳定 */
    netJitter?: number;
    /** 网络质量 */
    netQualityLevel?: number;
    /** 视频画面的宽度 */
    videoWidth?: number;
    /** 视频画面的高度 */
    videoHeight?: number;
    /**
     * 缓冲的视频总时长
     *
     * 单位为 ms
     */
    videoCache?: number;
    /**
     * 缓冲的音频总时长
     *
     * 单位为 ms
     */
    audioCache?: number;
    /** 解码器中缓存的视频帧数 (Android 端硬解码时存在） */
    vDecCacheSize?: number;
    /** 缓冲的总视频帧数，该数值越大，播放延迟越高 */
    vSumCacheSize?: number;
    /**
     * 音画同步错位时间（播放），此数值越小，音画同步越好
     *
     * 单位为 ms
     */
    avPlayInterval?: number;
    /**
     * 音画同步错位时间（网络），此数值越小，音画同步越好
     *
     * @decs 单位为 ms
     */
    avRecvInterval?: number;
    /** 音频缓冲时长阈值，缓冲超过该阈值后，播放器会开始调控延时 */
    audioCacheThreshold?: number;
}
interface _LivePlayerOnStatechangeDetail {
    /**
     * 状态码
     *
     * 2001 已经连接服务器
     *
     * 2002 已经连接服务器，开始拉流
     *
     * 2003 网络接收到首个视频数据包 IDR
     *
     * 2004 视频播放开始
     *
     * 2005 视频播放进度
     *
     * 2006 视频播放结束
     *
     * 2007 视频播放 Loading
     *
     * 2008 解码器启动
     *
     * 2009 视频分辨率改变
     *
     * -2301 网络断连，且经多次重连抢救无效，更多重试请自行重启播放
     *
     * -2302 获取加速拉流地址失败
     *
     * 2101 当前视频帧解码失败
     *
     * 2102 当前音频帧解码失败
     *
     * 2103 网络断连, 已启动自动重连
     *
     * 2104 网络来包不稳，可能是下行带宽不足，或由于主播端出流不均匀
     *
     * 2105 当前视频播放出现卡顿
     *
     * 2106 硬解启动失败，采用软解
     *
     * 2107 当前视频帧不连续，可能丢帧
     *
     * 2108 当前流硬解第一个 I 帧失败，SDK 自动切软解
     *
     * 3001 RTMP - DNS解析失败
     *
     * 3002 RTMP 服务器连接失败
     *
     * 3003 RTMP 服务器握手失败
     *
     * 3005 RTMP 读/写失败
     */
    code: _LivePlayerCode;
}
type _LivePlayerOnStatechangeEvent = _CustomEvent<_LivePlayerOnStatechangeDetail>;
/** 播放状态变化时触发 */
type _LivePlayerOnStatechange = (event: _LivePlayerOnStatechangeEvent) => void;
interface _LivePlayerOnNetstatusDetail {
    /** 网络状态 */
    info: _LivePlayerInfo;
}
type _LivePlayerOnNetstatusEvent = _CustomEvent<_LivePlayerOnNetstatusDetail>;
/** 网络状态变化时触发 */
type _LivePlayerOnNetstatus = (event: _LivePlayerOnNetstatusEvent) => void;
interface _LivePlayerOnFullscreenchangeDetail {
    direction: _LivePlayerOrientation;
    fullScreen: boolean;
}
type _LivePlayerOnFullscreenchangeEvent = _CustomEvent<_LivePlayerOnFullscreenchangeDetail>;
/** 全屏变化时触发 */
type _LivePlayerOnFullscreenchange = (event: _LivePlayerOnFullscreenchangeEvent) => void;
type _LivePlayerOnAudiovolumenotifyEvent = _BaseEvent;
/** 播放音量变化时触发 */
type _LivePlayerOnAudiovolumenotify = (event: _LivePlayerOnAudiovolumenotifyEvent) => void;
type _LivePlayerOnEnterpictureinpictureEvent = _BaseEvent;
/** 播放器进入小窗时触发 */
type _LivePlayerOnEnterpictureinpicture = (event: _LivePlayerOnEnterpictureinpictureEvent) => void;
type _LivePlayerOnLeavepictureinpictureEvent = _BaseEvent;
/** 播放器退出小窗时触发 */
type _LivePlayerOnLeavepictureinpicture = (event: _LivePlayerOnLeavepictureinpictureEvent) => void;
/** 实时音视频播放（直播拉流）属性 */
type _LivePlayerProps = CommonProps & Partial<{
    /** 唯一标志符 */
    id: string;
    /** 音视频地址 */
    src: string;
    /**
     * 实时模式
     *
     * RTC 实时通话，该模式时延更低
     *
     * 默认为 live
     *
     * @dec live 直播
     */
    mode: _LivePlayerMode;
    /**
     * 是否自动播放
     *
     * 默认为 false
     */
    autoplay: boolean;
    /**
     * 是否静音
     *
     * 默认为 false
     */
    muted: boolean;
    /**
     * 画面方向
     *
     * Vertical 纵向
     *
     * Horizontal 横向
     *
     * 默认为 vertical
     */
    orientation: _LivePlayerOrientation;
    /**
     * 填充模式
     *
     * Contain 图像长边填满屏幕，短边区域会被填充⿊⾊
     *
     * FillCrop 图像铺满屏幕，超出显示区域的部分将被截掉
     *
     * 默认为 contain
     */
    objectFit: _LivePlayerObjectFit;
    /**
     * 进入后台时是否静音
     *
     * 默认为 false
     */
    backgroundMute: boolean;
    /**
     * 声音输出方式
     *
     * Speaker 扬声器
     *
     * Ear 听筒
     *
     * 默认为 speaker
     */
    soundMode: _LivePlayerSoundMode;
    /**
     * 最小缓冲区
     *
     * 单位为 s
     *
     * 默认为 1
     */
    minCache: number;
    /**
     * 最大缓冲区
     *
     * 单位为 s
     *
     * 默认为 3
     */
    maxCache: number;
    /** 设置小窗模式，空字符串或通过数组形式设置多种模式 */
    pictureInPictureMode: _LivePlayerPictureInPictureMode | _LivePlayerPictureInPictureMode[];
    /** 播放状态变化时触发 */
    onStatechange: _LivePlayerOnStatechange;
    /** 网络状态变化时触发 */
    onNetstatus: _LivePlayerOnNetstatus;
    /** 全屏变化时触发 */
    onFullscreenchange: _LivePlayerOnFullscreenchange;
    /** 播放音量变化时触发 */
    onAudiovolumenotify: _LivePlayerOnAudiovolumenotify;
    /** 播放器进入小窗时触发 */
    onEnterpictureinpicture: _LivePlayerOnEnterpictureinpicture;
    /** 播放器退出小窗时触发 */
    onLeavepictureinpicture: _LivePlayerOnLeavepictureinpicture;
}>;
/** 实时音视频播放（直播拉流） */
type _LivePlayer = DefineComponent<_LivePlayerProps>;
/** 实时音视频播放（直播拉流）实例 */
type _LivePlayerInstance = InstanceType<_LivePlayer>;

declare global {
    namespace UniHelper {
        /**
         * 实时模式
         *
         * RTC 实时通话，该模式时延更低
         *
         * @dec live 直播
         */
        type LivePlayerMode = _LivePlayerMode;
        /**
         * 画面方向
         *
         * Vertical 纵向
         *
         * Horizontal 横向
         */
        type LivePlayerOrientation = _LivePlayerOrientation;
        /**
         * 填充模式
         *
         * Contain 图像长边填满屏幕，短边区域会被填充⿊⾊
         *
         * FillCrop 图像铺满屏幕，超出显示区域的部分将被截掉
         */
        type LivePlayerObjectFit = _LivePlayerObjectFit;
        /**
         * 声音输出方式
         *
         * Speaker 扬声器
         *
         * Ear 听筒
         *
         * 默认为 speaker
         */
        type LivePlayerSoundMode = _LivePlayerSoundMode;
        /**
         * 设置小窗模式
         *
         * Push 路由 push 时触发小窗
         *
         * Pop 路由 pop 时触发小窗
         */
        type LivePlayerPictureInPictureMode = _LivePlayerPictureInPictureMode;
        /**
         * 状态码
         *
         * 2001 已经连接服务器
         *
         * 2002 已经连接服务器，开始拉流
         *
         * 2003 网络接收到首个视频数据包 IDR
         *
         * 2004 视频播放开始
         *
         * 2005 视频播放进度
         *
         * 2006 视频播放结束
         *
         * 2007 视频播放 Loading
         *
         * 2008 解码器启动
         *
         * 2009 视频分辨率改变
         *
         * -2301 网络断连，且经多次重连抢救无效，更多重试请自行重启播放
         *
         * -2302 获取加速拉流地址失败
         *
         * 2101 当前视频帧解码失败
         *
         * 2102 当前音频帧解码失败
         *
         * 2103 网络断连, 已启动自动重连
         *
         * 2104 网络来包不稳，可能是下行带宽不足，或由于主播端出流不均匀
         *
         * 2105 当前视频播放出现卡顿
         *
         * 2106 硬解启动失败，采用软解
         *
         * 2107 当前视频帧不连续，可能丢帧
         *
         * 2108 当前流硬解第一个 I 帧失败，SDK 自动切软解
         *
         * 3001 RTMP - DNS解析失败
         *
         * 3002 RTMP 服务器连接失败
         *
         * 3003 RTMP 服务器握手失败
         *
         * 3005 RTMP 读/写失败
         */
        type LivePlayerCode = _LivePlayerCode;
        /** 网络状态 */
        interface LivePlayerInfo extends _LivePlayerInfo {
        }
        interface LivePlayerOnStatechangeDetail extends _LivePlayerOnStatechangeDetail {
        }
        type LivePlayerOnStatechangeEvent = _LivePlayerOnStatechangeEvent;
        /** 播放状态变化时触发 */
        interface LivePlayerOnStatechange extends _LivePlayerOnStatechange {
        }
        interface LivePlayerOnNetstatusDetail extends _LivePlayerOnNetstatusDetail {
        }
        type LivePlayerOnNetstatusEvent = _LivePlayerOnNetstatusEvent;
        /** 网络状态变化时触发 */
        interface LivePlayerOnNetstatus extends _LivePlayerOnNetstatus {
        }
        interface LivePlayerOnFullscreenchangeDetail extends _LivePlayerOnFullscreenchangeDetail {
        }
        type LivePlayerOnFullscreenchangeEvent = _LivePlayerOnFullscreenchangeEvent;
        /** 全屏变化时触发 */
        interface LivePlayerOnFullscreenchange extends _LivePlayerOnFullscreenchange {
        }
        type LivePlayerOnAudiovolumenotifyEvent = _LivePlayerOnAudiovolumenotifyEvent;
        /** 播放音量变化时触发 */
        interface LivePlayerOnAudiovolumenotify extends _LivePlayerOnAudiovolumenotify {
        }
        type LivePlayerOnEnterpictureinpictureEvent = _LivePlayerOnEnterpictureinpictureEvent;
        /** 播放器进入小窗时触发 */
        interface LivePlayerOnEnterpictureinpicture extends _LivePlayerOnEnterpictureinpicture {
        }
        type LivePlayerOnLeavepictureinpictureEvent = _LivePlayerOnLeavepictureinpictureEvent;
        /** 播放器退出小窗时触发 */
        interface LivePlayerOnLeavepictureinpicture extends _LivePlayerOnLeavepictureinpicture {
        }
        /** 实时音视频播放（直播拉流）属性 */
        type LivePlayerProps = _LivePlayerProps;
        /** 实时音视频播放（直播拉流） */
        type LivePlayer = _LivePlayer;
        /** 实时音视频播放（直播拉流）实例 */
        type LivePlayerInstance = _LivePlayerInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 实时音视频播放（直播拉流）
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/live-player.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        LivePlayer: _LivePlayer;
    }
}

/**
 * 推流视频模式
 *
 * SD 标清
 *
 * HD 高清
 *
 * FHD 超清
 */
type _LivePusherMode = "SD" | "HD" | "FHD";
/**
 * 画面方向
 *
 * Vertical 纵向
 *
 * Horizontal 横向
 */
type _LivePusherOrientation = "vertical" | "horizontal";
/**
 * 音质
 *
 * High 高音质 48KHz
 *
 * Low 低音质 16KHz
 */
type _LivePusherAudioQuality = "high" | "low";
/**
 * 使用的摄像头
 *
 * Front 前置摄像头
 *
 * Back 后置摄像头
 */
type _LivePusherDevicePosition = "front" | "back";
/**
 * 控制本地预览画面是否镜像
 *
 * Auto 前置摄像头镜像，后置摄像头不镜像
 *
 * Enable 前后置摄像头均镜像
 *
 * Disable 前后置摄像头均不镜像
 */
type _LivePusherLocalMirror = "auto" | "enable" | "disable";
/**
 * 音频混响类型
 *
 * 0 关闭
 *
 * 1 KTV
 *
 * 2 小房间
 *
 * 3 大会堂
 *
 * 4 低沉
 *
 * 5 洪亮
 *
 * 6 金属声
 *
 * 7 磁性
 */
type _LivePusherAudioReverbType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
/**
 * 音量类型
 *
 * Auto 自动
 *
 * Media 媒体音量
 *
 * Voicecall 通话音量
 */
type _LivePusherAudioVolumeType = "auto" | "media" | "voicecall";
/**
 * 状态码
 *
 * 1001 已经连接推流服务器
 *
 * 1002 已经与服务器握手完毕，开始推流
 *
 * 1003 打开摄像头成功
 *
 * 1004 录屏启动成功
 *
 * 1005 推流动态调整分辨率
 *
 * 1006 推流动态调整码率
 *
 * 1007 首帧画面采集完成
 *
 * 1008 编码器启动
 *
 * -1301 打开摄像头失败
 *
 * -1302 打开麦克风失败
 *
 * -1303 视频编码失败
 *
 * -1304 音频编码失败
 *
 * -1305 不支持的视频分辨率
 *
 * -1306 不支持的音频采样率
 *
 * -1307 网络断连，且经多次重连抢救无效，更多重试请自行重启推流
 *
 * -1308 开始录屏失败，可能是被用户拒绝
 *
 * -1309 录屏失败，不支持的 Android 系统版本，需要 5.0 以上的系统
 *
 * -1310 录屏被其他应用打断了
 *
 * -1311 Android Mic 打开成功，但是录不到音频数据
 *
 * -1312 录屏动态切横竖屏失败
 *
 * 1101 网络状况不佳：上行带宽太小，上传数据受阻
 *
 * 1102 网络断连, 已启动自动重连
 *
 * 1103 硬编码启动失败,采用软编码
 *
 * 1104 视频编码失败
 *
 * 1105 新美颜软编码启动失败，采用老的软编码
 *
 * 1106 新美颜软编码启动失败，采用老的软编码
 *
 * 3001 RTMP -DNS 解析失败
 *
 * 3002 RTMP 服务器连接失败
 *
 * 3003 RTMP 服务器握手失败
 *
 * 3004 RTMP 服务器主动断开，请检查推流地址的合法性或防盗链有效期
 *
 * 3005 RTMP 读/写失败
 */
type _LivePusherCode = 1001 | 1002 | 1003 | 1004 | 1005 | 1006 | 1007 | 1008 | -1301 | -1302 | -1303 | -1304 | -1305 | -1306 | -1307 | -1308 | -1309 | -1310 | -1311 | -1312 | 1101 | 1102 | 1103 | 1104 | 1105 | 1106 | 3001 | 3002 | 3003 | 3004 | 3005;
/** 网络状态 */
interface _LivePusherInfo {
    /**
     * 状态码
     *
     * 1001 已经连接推流服务器
     *
     * 1002 已经与服务器握手完毕，开始推流
     *
     * 1003 打开摄像头成功
     *
     * 1004 录屏启动成功
     *
     * 1005 推流动态调整分辨率
     *
     * 1006 推流动态调整码率
     *
     * 1007 首帧画面采集完成
     *
     * 1008 编码器启动
     *
     * -1301 打开摄像头失败
     *
     * -1302 打开麦克风失败
     *
     * -1303 视频编码失败
     *
     * -1304 音频编码失败
     *
     * -1305 不支持的视频分辨率
     *
     * -1306 不支持的音频采样率
     *
     * -1307 网络断连，且经多次重连抢救无效，更多重试请自行重启推流
     *
     * -1308 开始录屏失败，可能是被用户拒绝
     *
     * -1309 录屏失败，不支持的 Android 系统版本，需要 5.0 以上的系统
     *
     * -1310 录屏被其他应用打断了
     *
     * -1311 Android Mic 打开成功，但是录不到音频数据
     *
     * -1312 录屏动态切横竖屏失败
     *
     * 1101 网络状况不佳：上行带宽太小，上传数据受阻
     *
     * 1102 网络断连, 已启动自动重连
     *
     * 1103 硬编码启动失败,采用软编码
     *
     * 1104 视频编码失败
     *
     * 1105 新美颜软编码启动失败，采用老的软编码
     *
     * 1106 新美颜软编码启动失败，采用老的软编码
     *
     * 3001 RTMP -DNS 解析失败
     *
     * 3002 RTMP 服务器连接失败
     *
     * 3003 RTMP 服务器握手失败
     *
     * 3004 RTMP 服务器主动断开，请检查推流地址的合法性或防盗链有效期
     *
     * 3005 RTMP 读/写失败
     */
    code?: _LivePusherCode;
    /** 具体的网络状态信息 */
    message?: string;
    /**
     * 当前视频编/码器输出的比特率
     *
     * 单位为 kbps
     */
    videoBitrate?: number;
    /**
     * 当前音频编/码器输出的比特率
     *
     * 单位为 kbps
     */
    audioBitrate?: number;
    /** 当前视频帧率 */
    videoFPS?: number;
    /**
     * 当前视频 GOP，也就是每两个关键帧 I 帧间隔时长
     *
     * 单位为 s
     */
    videoGOP?: number;
    /** 当前的发送/接收速度 */
    netSpeed?: number;
    /** 网络抖动情况，抖动越大，网络越不稳定 */
    netJitter?: number;
    /** 网络质量 */
    netQualityLevel?: number;
    /** 视频画面的宽度 */
    videoWidth?: number;
    /** 视频画面的高度 */
    videoHeight?: number;
    /**
     * 缓冲的视频总时长
     *
     * 单位为 ms
     */
    videoCache?: number;
    /**
     * 缓冲的音频总时长
     *
     * 单位为 ms
     */
    audioCache?: number;
}
/**
 * 错误状态码
 *
 * 10001 用户禁止使用摄像头
 *
 * 10002 用户禁止使用录音
 *
 * 10003 背景音资源（BGM）加载失败
 *
 * 10004 等待画面资源（waiting-image）加载失败
 */
type _LiverPusherErrCode = 10_001 | 10_002 | 10_003 | 10_004;
interface _LivePusherOnStatechangeDetail {
    /**
     * 状态码
     *
     * 1001 已经连接推流服务器
     *
     * 1002 已经与服务器握手完毕，开始推流
     *
     * 1003 打开摄像头成功
     *
     * 1004 录屏启动成功
     *
     * 1005 推流动态调整分辨率
     *
     * 1006 推流动态调整码率
     *
     * 1007 首帧画面采集完成
     *
     * 1008 编码器启动
     *
     * -1301 打开摄像头失败
     *
     * -1302 打开麦克风失败
     *
     * -1303 视频编码失败
     *
     * -1304 音频编码失败
     *
     * -1305 不支持的视频分辨率
     *
     * -1306 不支持的音频采样率
     *
     * -1307 网络断连，且经多次重连抢救无效，更多重试请自行重启推流
     *
     * -1308 开始录屏失败，可能是被用户拒绝
     *
     * -1309 录屏失败，不支持的 Android 系统版本，需要 5.0 以上的系统
     *
     * -1310 录屏被其他应用打断了
     *
     * -1311 Android Mic 打开成功，但是录不到音频数据
     *
     * -1312 录屏动态切横竖屏失败
     *
     * 1101 网络状况不佳：上行带宽太小，上传数据受阻
     *
     * 1102 网络断连, 已启动自动重连
     *
     * 1103 硬编码启动失败,采用软编码
     *
     * 1104 视频编码失败
     *
     * 1105 新美颜软编码启动失败，采用老的软编码
     *
     * 1106 新美颜软编码启动失败，采用老的软编码
     *
     * 3001 RTMP -DNS 解析失败
     *
     * 3002 RTMP 服务器连接失败
     *
     * 3003 RTMP 服务器握手失败
     *
     * 3004 RTMP 服务器主动断开，请检查推流地址的合法性或防盗链有效期
     *
     * 3005 RTMP 读/写失败
     */
    code: _LivePusherCode;
}
type _LivePusherOnStatechangeEvent = _CustomEvent<_LivePusherOnStatechangeDetail>;
/** 播放状态变化时触发 */
type _LivePusherOnStatechange = (event: _LivePusherOnStatechangeEvent) => void;
interface _LivePusherOnNetstatusDetail {
    /** 网络状态 */
    info: _LivePusherInfo;
}
type _LivePusherOnNetstatusEvent = _CustomEvent<_LivePusherOnNetstatusDetail>;
/** 网络状态变化时触发 */
type _LivePusherOnNetstatus = (event: _LivePusherOnNetstatusEvent) => void;
interface _LivePusherOnErrorDetail {
    /**
     * 错误状态码
     *
     * 10001 用户禁止使用摄像头
     *
     * 10002 用户禁止使用录音
     *
     * 10003 背景音资源（BGM）加载失败
     *
     * 10004 等待画面资源（waiting-image）加载失败
     */
    errCode: _LiverPusherErrCode;
    /** 错误信息 */
    errMsg: string;
}
type _LivePusherOnErrorEvent = _CustomEvent<_LivePusherOnErrorDetail>;
/** 渲染错误时触发 */
type _LivePusherOnError = (event: _LivePusherOnErrorEvent) => void;
type _LivePusherOnBgmstartEvent = _BaseEvent;
/** 背景音开始播放时触发 */
type _LivePusherOnBgmstart = (event: _LivePusherOnBgmstartEvent) => void;
interface _LivePusherOnBgmprogressDetail {
    progress: number;
    duration: number;
}
type _LivePusherOnBgmprogressEvent = _CustomEvent<_LivePusherOnBgmprogressDetail>;
/** 背景音进度变化时触发 */
type _LivePusherOnBgmprogress = (event: _LivePusherOnBgmprogressEvent) => void;
type _LivePusherOnBgmcompleteEvent = _BaseEvent;
/** 背景音播放完成时触发 */
type _LivePusherOnBgmcomplete = (event: _LivePusherOnBgmcompleteEvent) => void;
/** 实时音视频录制（直播推流）属性 */
type _LivePusherProps = CommonProps & Partial<{
    /** 推流地址，支持 RTMP 协议 */
    url: string;
    /**
     * 推流视频模式
     *
     * SD 标清
     *
     * HD 高清
     *
     * FHD 超清
     *
     * 默认为 SD
     */
    mode: _LivePusherMode;
    /**
     * 是否自动推流
     *
     * 默认为 false
     */
    autopush: boolean;
    /**
     * 视频宽高比例
     *
     * 默认为 3:2
     */
    aspect: number;
    /**
     * 是否静音
     *
     * 默认为 false
     */
    muted: boolean;
    /**
     * 是否开启摄像头
     *
     * 默认为 true
     */
    enableCamera: boolean;
    /**
     * 自动聚焦
     *
     * 默认为 true
     */
    autoFocus: boolean;
    /**
     * 美颜
     *
     * 取值范围为 0 - 9
     *
     * 默认为 0
     */
    beauty: number;
    /**
     * 美白
     *
     * 取值范围为 0 - 9
     *
     * 默认为 0
     */
    whiteness: number;
    /**
     * 画面方向
     *
     * Vertical 纵向
     *
     * Horizontal 横向
     *
     * 默认为 vertical
     */
    orientation: _LivePusherOrientation;
    /**
     * 最小码率
     *
     * 默认为 200
     */
    minBitrate: number;
    /**
     * 最大码率
     *
     * 默认为 1000
     */
    maxBitrate: number;
    /**
     * 音质
     *
     * High 高音质 48KHz
     *
     * Low 低音质 16KHz
     *
     * 默认为 high
     */
    audioQuality: _LivePusherAudioQuality;
    /** 进入后台时推流的等待画面 */
    waitingImage: string;
    /** 等待画面资源的 MD5 值 */
    waitingImageMd5: string;
    /**
     * 是否调整焦距
     *
     * 默认为 false
     */
    zoom: boolean;
    /**
     * 使用的摄像头
     *
     * Front 前置摄像头
     *
     * Back 后置摄像头
     *
     * 默认为 front
     */
    devicePosition: _LivePusherDevicePosition;
    /**
     * 进入后台时是否静音
     *
     * 默认为 false
     */
    backgroundMute: boolean;
    /**
     * 设置推流画面是否镜像，产生的效果在 live-player 呈现
     *
     * 默认为 false
     */
    remoteMirror: boolean;
    /**
     * 控制本地预览画面是否镜像
     *
     * Auto 前置摄像头镜像，后置摄像头不镜像
     *
     * Enable 前后置摄像头均镜像
     *
     * Disable 前后置摄像头均不镜像
     *
     * 默认为 auto
     */
    localMirror: _LivePusherLocalMirror;
    /**
     * 音频混响类型
     *
     * 0 关闭
     *
     * 1 KTV
     *
     * 2 小房间
     *
     * 3 大会堂
     *
     * 4 低沉
     *
     * 5 洪亮
     *
     * 6 金属声
     *
     * 7 磁性
     *
     * 默认为 0
     */
    audioReverbType: _LivePusherAudioReverbType;
    /**
     * 是否开启麦克风
     *
     * 默认为 true
     */
    enableMic: boolean;
    /**
     * 是否开启音频自动增益
     *
     * 默认为 false
     */
    enableAgc: boolean;
    /**
     * 是否开启音频噪声抑制
     *
     * 默认为 false
     */
    enableAns: boolean;
    /**
     * 音量类型
     *
     * Auto 自动
     *
     * Media 媒体音量
     *
     * Voicecall 通话音量
     *
     * 默认为 auto
     */
    audioVolumeType: _LivePusherAudioVolumeType;
    /** 播放状态变化时触发 */
    onStatechange: _LivePusherOnStatechange;
    /** 网络状态变化时触发 */
    onNetstatus: _LivePusherOnNetstatus;
    /** 渲染错误时触发 */
    onError: _LivePusherOnError;
    /** 背景音开始播放时触发 */
    onBgmstart: _LivePusherOnBgmstart;
    /** 背景音进度变化时触发 */
    onBgmprogress: _LivePusherOnBgmprogress;
    /** 背景音播放完成时触发 */
    onBgmcomplete: _LivePusherOnBgmcomplete;
}>;
/** 实时音视频录制（直播推流） */
type _LivePusher = DefineComponent<_LivePusherProps>;
/** 实时音视频录制（直播推流）实例 */
type _LivePusherInstance = InstanceType<_LivePusher>;

declare global {
    namespace UniHelper {
        /**
         * 推流视频模式
         *
         * SD 标清
         *
         * HD 高清
         *
         * FHD 超清
         */
        type LivePusherMode = _LivePusherMode;
        /**
         * 画面方向
         *
         * Vertical 纵向
         *
         * Horizontal 横向
         */
        type LivePusherOrientation = _LivePusherOrientation;
        /**
         * 音质
         *
         * High 高音质 48KHz
         *
         * Low 低音质 16KHz
         */
        type LivePusherAudioQuality = _LivePusherAudioQuality;
        /**
         * 使用的摄像头
         *
         * Front 前置摄像头
         *
         * Back 后置摄像头
         */
        type LivePusherDevicePosition = _LivePusherDevicePosition;
        /**
         * 控制本地预览画面是否镜像
         *
         * Auto 前置摄像头镜像，后置摄像头不镜像
         *
         * Enable 前后置摄像头均镜像
         *
         * Disable 前后置摄像头均不镜像
         */
        type LivePusherLocalMirror = _LivePusherLocalMirror;
        /**
         * 音频混响类型
         *
         * 0 关闭
         *
         * 1 KTV
         *
         * 2 小房间
         *
         * 3 大会堂
         *
         * 4 低沉
         *
         * 5 洪亮
         *
         * 6 金属声
         *
         * 7 磁性
         */
        type LivePusherAudioReverbType = _LivePusherAudioReverbType;
        /**
         * 音量类型
         *
         * Auto 自动
         *
         * Media 媒体音量
         *
         * Voicecall 通话音量
         */
        type LivePusherAudioVolumeType = _LivePusherAudioVolumeType;
        /**
         * 状态码
         *
         * 1001 已经连接推流服务器
         *
         * 1002 已经与服务器握手完毕，开始推流
         *
         * 1003 打开摄像头成功
         *
         * 1004 录屏启动成功
         *
         * 1005 推流动态调整分辨率
         *
         * 1006 推流动态调整码率
         *
         * 1007 首帧画面采集完成
         *
         * 1008 编码器启动
         *
         * -1301 打开摄像头失败
         *
         * -1302 打开麦克风失败
         *
         * -1303 视频编码失败
         *
         * -1304 音频编码失败
         *
         * -1305 不支持的视频分辨率
         *
         * -1306 不支持的音频采样率
         *
         * -1307 网络断连，且经多次重连抢救无效，更多重试请自行重启推流
         *
         * -1308 开始录屏失败，可能是被用户拒绝
         *
         * -1309 录屏失败，不支持的 Android 系统版本，需要 5.0 以上的系统
         *
         * -1310 录屏被其他应用打断了
         *
         * -1311 Android Mic 打开成功，但是录不到音频数据
         *
         * -1312 录屏动态切横竖屏失败
         *
         * 1101 网络状况不佳：上行带宽太小，上传数据受阻
         *
         * 1102 网络断连, 已启动自动重连
         *
         * 1103 硬编码启动失败,采用软编码
         *
         * 1104 视频编码失败
         *
         * 1105 新美颜软编码启动失败，采用老的软编码
         *
         * 1106 新美颜软编码启动失败，采用老的软编码
         *
         * 3001 RTMP -DNS 解析失败
         *
         * 3002 RTMP 服务器连接失败
         *
         * 3003 RTMP 服务器握手失败
         *
         * 3004 RTMP 服务器主动断开，请检查推流地址的合法性或防盗链有效期
         *
         * 3005 RTMP 读/写失败
         */
        type LivePusherCode = _LivePusherCode;
        /** 网络状态 */
        interface LivePusherInfo extends _LivePusherInfo {
        }
        /**
         * 错误状态码
         *
         * 10001 用户禁止使用摄像头
         *
         * 10002 用户禁止使用录音
         *
         * 10003 背景音资源（BGM）加载失败
         *
         * 10004 等待画面资源（waiting-image）加载失败
         */
        type LiverPusherErrCode = _LiverPusherErrCode;
        interface LivePusherOnStatechangeDetail extends _LivePusherOnStatechangeDetail {
        }
        type LivePusherOnStatechangeEvent = _LivePusherOnStatechangeEvent;
        /** 播放状态变化时触发 */
        interface LivePusherOnStatechange extends _LivePusherOnStatechange {
        }
        interface LivePusherOnNetstatusDetail extends _LivePusherOnNetstatusDetail {
        }
        type LivePusherOnNetstatusEvent = _LivePusherOnNetstatusEvent;
        /** 网络状态变化时触发 */
        interface LivePusherOnNetstatus extends _LivePusherOnNetstatus {
        }
        interface LivePusherOnErrorDetail extends _LivePusherOnErrorDetail {
        }
        type LivePusherOnErrorEvent = _LivePusherOnErrorEvent;
        /** 渲染错误时触发 */
        interface LivePusherOnError extends _LivePusherOnError {
        }
        type LivePusherOnBgmstartEvent = _LivePusherOnBgmstartEvent;
        /** 背景音开始播放时触发 */
        interface LivePusherOnBgmstart extends _LivePusherOnBgmstart {
        }
        interface LivePusherOnBgmprogressDetail extends _LivePusherOnBgmprogressDetail {
        }
        type LivePusherOnBgmprogressEvent = _LivePusherOnBgmprogressEvent;
        /** 背景音进度变化时触发 */
        interface LivePusherOnBgmprogress extends _LivePusherOnBgmprogress {
        }
        type LivePusherOnBgmcompleteEvent = _LivePusherOnBgmcompleteEvent;
        /** 背景音播放完成时触发 */
        interface LivePusherOnBgmcomplete extends _LivePusherOnBgmcomplete {
        }
        /** 实时音视频录制（直播推流）属性 */
        type LivePusherProps = _LivePusherProps;
        /** 实时音视频录制（直播推流） */
        type LivePusher = _LivePusher;
        /** 实时音视频录制（直播推流）实例 */
        type LivePusherInstance = _LivePusherInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 实时音视频录制（直播推流)
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/live-pusher.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        LivePusher: _LivePusher;
    }
}

/** 显示方式 */
type _MapDisplay = "BYCLICK" | "ALWAYS";
/**
 * 文本对齐方式
 *
 * Left 左对齐
 *
 * Right 右对齐
 *
 * Center 居中对齐
 */
type _MapTextAlign = "left" | "right" | "center";
/** 气泡 */
interface _MapCallout {
    /** 文本 */
    content: string;
    /** 文本颜色 */
    color: string;
    /** 文字大小 */
    fontSize: number;
    /** 边框圆角 */
    borderRadius: number;
    /** 边框宽度 */
    borderWidth: number;
    /** 边框颜色 */
    borderColor: string;
    /** 背景色 */
    bgColor: string;
    /** 文本边缘留白 */
    padding: number;
    /** 显示方式 */
    display: _MapDisplay;
    /**
     * 文本对齐方式
     *
     * Left 左对齐
     *
     * Right 右对齐
     *
     * Center 居中对齐
     */
    textAlign: _MapTextAlign;
}
/** 自定义气泡 */
interface _MapCustomCallout {
    /** 显示方式 */
    display: _MapDisplay;
    /** 横向偏移量，向右为正数 */
    anchorX: number;
    /** 纵向偏移量，向下为正数 */
    anchorY: number;
}
/** 标签 */
interface _MapLabel {
    /** 文本 */
    content: string;
    /** 文本颜色 */
    color: string;
    /** 文字大小 */
    fontSize: number;
    /** 横坐标，原点是 marker 对应的经纬度 */
    x: number;
    /** 纵坐标，原点是 marker 对应的经纬度 */
    y: number;
    /** 横向偏移量，向右为正数 */
    anchorX: number;
    /** 纵向偏移量，向下为正数 */
    anchorY: number;
    /** 边框圆角 */
    borderRadius: number;
    /** 边框宽度 */
    borderWidth: number;
    /** 边框颜色 */
    borderColor: string;
    /** 背景色 */
    bgColor: string;
    /** 文本边缘留白 */
    padding: number;
    /** 显示方式 */
    display: _MapDisplay;
    /**
     * 文本对齐方式
     *
     * Left 左对齐
     *
     * Right 右对齐
     *
     * Center 居中对齐
     */
    textAlign: _MapTextAlign;
    /** 自定义气泡 */
    customCallout: _MapCustomCallout;
    /** 无障碍访问，元素的额外描述 */
    ariaLabel: string;
    /**
     * 是否参与点聚合
     *
     * 默认为 false
     */
    joinCluster: boolean;
}
/** 锚点 */
interface _MapAnchor {
    /**
     * 横向
     *
     * 取值范围为 0 - 1
     */
    x: number;
    /**
     * 纵向
     *
     * 取值范围为 0 - 1
     */
    y: number;
}
/**
 * 纬度
 *
 * 取值范围为 -90 - 90
 */
type _MapLatitude = number;
/**
 * 经度
 *
 * 取值范围为 -180 - 180
 */
type _MapLongitude = number;
/** 经纬度点 */
interface _MapPoint {
    /**
     * 纬度
     *
     * 取值范围为 -90 - 90
     */
    latitude: _MapLatitude;
    /**
     * 经度
     *
     * 取值范围为 -180 - 180
     */
    longitude: _MapLongitude;
}
/**
 * 压盖关系
 *
 * Abovelabels 显示在所有 POI 之上
 *
 * Abovebuildings 显示在楼块之上 POI 之下
 *
 * Aboveroads 显示在道路之上楼块之下
 */
type _MapLevel = "abovelabels" | "abovebuildings" | "aboveroads";
/**
 * 主题
 *
 * 只在初始化时有效，不能动态变更
 *
 * 仅 Android 支持
 *
 * Normal 正常
 *
 * Satellite 卫星图
 */
type _MapTheme = "normal" | "satellite";
/**
 * 标记点 ID
 *
 * Marker 点击事件回调中会返回
 *
 * 最大限制 9 位数
 */
type _MapMarkerId = number;
/** 标记点 */
interface _MapMarker {
    /**
     * 标记点 ID
     *
     * Marker 点击事件回调中会返回
     *
     * 最大限制 9 位数
     */
    id: _MapMarkerId;
    /**
     * 纬度
     *
     * 取值范围为 -90 - 90
     */
    latitude: _MapLatitude;
    /**
     * 经度
     *
     * 取值范围为 -180 - 180
     */
    longitude: _MapLongitude;
    /**
     * 标注点名
     *
     * 点击时显示，callout 存在时将被忽略
     */
    title?: string;
    /**
     * 图标路径
     *
     * 项目目录下的图片路径，支持相对路径和临时路径
     */
    iconPath: string;
    /**
     * 顺时针旋转角度
     *
     * 取值范围为 0 - 360
     *
     * 默认为 0
     */
    rotate?: number;
    /**
     * 透明度
     *
     * 取值范围为 0 - 1 完全透明 - 不透明
     *
     * 默认为 1
     */
    alpha?: number;
    /**
     * 图标宽度
     *
     * 默认为实际宽度
     */
    width?: number;
    /**
     * 图标高度
     *
     * 默认为实际高度
     */
    height?: number;
    /** 自定义标记点上方的气泡窗口 */
    callout?: _MapCallout;
    /** 为标记点旁边增加标签 */
    label?: _MapLabel;
    /**
     * 经纬度在标注图标的锚点
     *
     * 默认为 { x: 0.5, y: 1 } 底边中点
     */
    anchor?: _MapAnchor;
    /** 自定义点聚合簇效果时使用 */
    clusterId?: number;
    /** 自定义气泡窗口 */
    customCallout?: _MapCustomCallout;
    /** 无障碍访问，（属性）元素的额外描述 */
    ariaLabel?: string;
    /**
     * 是否参与点聚合
     *
     * 如果指定点聚合，此选项值必须设置为 true 才会生效
     */
    joinCluster?: boolean;
}
/** 路线 */
interface _MapPolyline {
    /** 经纬度点数组 */
    points: _MapPoint[];
    /**
     * 十六进制颜色
     *
     * ColorList 不存在时有效
     */
    color?: string;
    /** 线的宽度 */
    width?: number;
    /**
     * 是否虚线
     *
     * 默认为 false
     */
    dottedLine?: boolean;
    /**
     * 是否带箭头
     *
     * 默认为 false
     */
    arrowLine?: boolean;
    /**
     * 箭头图标路径
     *
     * 项目目录下的图片路径，支持相对路径和临时路径
     *
     * ArrowLine 为 true 时有效
     */
    arrowIconPath?: string;
    /** 线的边框颜色 */
    borderColor?: string;
    /** 线的宽度 */
    borderWidth?: number;
    /**
     * 彩虹线
     *
     * 存在时忽略 color
     */
    colorList?: string[];
    /**
     * 压盖关系
     *
     * Abovelabels 显示在所有 POI 之上
     *
     * Abovebuildings 显示在楼块之上 POI 之下
     *
     * Aboveroads 显示在道路之上楼块之下
     */
    level?: _MapLevel;
}
/** 多边形 */
interface _MapPolygon {
    /** 经纬度点数组 */
    points: _MapPoint[];
    /** 描边宽度 */
    strokeWidth?: number;
    /** 十六进制描边颜色 */
    strokeColor?: string;
    /** 十六进制填充颜色 */
    fillColor?: string;
    /** Z 轴数值 */
    zIndex?: number;
    /**
     * 压盖关系
     *
     * Abovelabels 显示在所有 POI 之上
     *
     * Abovebuildings 显示在楼块之上 POI 之下
     *
     * Aboveroads 显示在道路之上楼块之下
     */
    level?: _MapLevel;
}
/** 圆 */
interface _MapCircle {
    /**
     * 纬度
     *
     * 取值范围为 -90 - 90
     */
    latitude: _MapLatitude;
    /**
     * 经度
     *
     * 取值范围为 -180 - 180
     */
    longitude: _MapLongitude;
    /** 十六进制描边颜色 */
    color?: string;
    /** 十六进制填充颜色 */
    fillColor?: string;
    /** 半径 */
    radius: number;
    /** 描边宽度 */
    strokeWidth?: number;
    /**
     * 压盖关系
     *
     * Abovelabels 显示在所有 POI 之上
     *
     * Abovebuildings 显示在楼块之上 POI 之下
     *
     * Aboveroads 显示在道路之上楼块之下
     */
    level?: _MapLevel;
}
/** 控件在地图的位置 */
interface _MapPosition {
    /**
     * 距离地图的左边界多远
     *
     * 默认为 0
     */
    left?: number;
    /**
     * 距离地图的上边界多远
     *
     * 默认为 0
     */
    top?: number;
    /**
     * 控件宽度
     *
     * 默认为控件宽度
     */
    width?: number;
    /**
     * 控件高度
     *
     * 默认为图片高度
     */
    height?: number;
}
/**
 * 控件 ID
 *
 * 在控件点击事件回调中会返回
 */
type _MapControlId = number;
/** 控件 */
interface _MapControl {
    /**
     * 控件 ID
     *
     * 在控件点击事件回调中会返回
     */
    id?: _MapControlId;
    /** 控件在地图的位置 */
    position: _MapPosition;
    /**
     * 图标路径
     *
     * 项目目录下的图片路径，支持相对路径和临时路径
     */
    iconPath: string;
    /**
     * 是否可点击
     *
     * 默认不可点击
     */
    clickable?: boolean;
}
interface _MapOnMarkertapDetail {
    /**
     * 标记点 ID
     *
     * 最大限制 9 位数
     */
    markerId: _MapMarkerId;
}
type _MapOnMarkertapEvent = _CustomEvent<_MapOnMarkertapDetail>;
/** 点击标记点时触发 */
type _MapOnMarkertap = (event: _MapOnMarkertapEvent) => void;
interface _MapOnLabeltapDetail {
    /**
     * 标记点 ID
     *
     * 最大限制 9 位数
     */
    markerId: _MapMarkerId;
}
type _MapOnLabeltapEvent = _CustomEvent<_MapOnLabeltapDetail>;
/** 点击 label 时触发 */
type _MapOnLabeltap = (event: _MapOnLabeltapEvent) => void;
interface _MapOnCallouttapDetail {
    /**
     * 标记点 ID
     *
     * 最大限制 9 位数
     */
    markerId: _MapMarkerId;
}
type _MapOnCallouttapEvent = _CustomEvent<_MapOnCallouttapDetail>;
/** 点击标记点对应的气泡时触发 */
type _MapOnCallouttap = (event: _MapOnCallouttapEvent) => void;
interface _MapOnControltapDetail {
    /** 控件 ID */
    controlId: _MapControlId;
}
type _MapOnControltapEvent = _CustomEvent<_MapOnControltapDetail>;
/** 点击控件时触发 */
type _MapOnControltap = (event: _MapOnControltapEvent) => void;
type _MapOnRegionchangeEvent = _BaseEvent;
/** 视野发生变化时触发 */
type _MapOnRegionchange = (event: _MapOnRegionchangeEvent) => void;
type _MapOnTapEvent = _BaseEvent;
/** 点击地图时触发 */
type _MapOnTap = (event: _MapOnTapEvent) => void;
type _MapOnUpdatedEvent = _BaseEvent;
/** 地图渲染更新完成时触发 */
type _MapOnUpdated = (event: _MapOnUpdatedEvent) => void;
interface _MapOnAnchorpointtapDetail {
    /**
     * 纬度
     *
     * 取值范围为 -90 - 90
     */
    latitude: _MapLatitude;
    /**
     * 经度
     *
     * 取值范围为 -180 - 180
     */
    longitude: _MapLongitude;
}
type _MapOnAnchorpointtapEvent = _CustomEvent<_MapOnAnchorpointtapDetail>;
/** 点击定位标时触发 */
type _MapOnAnchorpointtap = (event: _MapOnAnchorpointtapEvent) => void;
interface _MapOnPoitapDetail {
    /** 名称 */
    name: string;
    /**
     * 纬度
     *
     * 取值范围为 -90 - 90
     */
    latitude: _MapLatitude;
    /**
     * 经度
     *
     * 取值范围为 -180 - 180
     */
    longitude: _MapLongitude;
}
type _MapOnPoitapEvent = _CustomEvent<_MapOnPoitapDetail>;
/** 点击地图 poi 点时触发 */
type _MapOnPoitap = (event: _MapOnPoitapEvent) => void;
/** 地图属性 */
type _MapProps = CommonProps & Partial<{
    /**
     * 中心纬度
     *
     * 取值范围为 -90 - 90
     */
    latitude: _MapLatitude;
    /**
     * 中心经度
     *
     * 取值范围为 -180 - 180
     */
    longitude: _MapLongitude;
    /**
     * 缩放级别
     *
     * 默认为 16
     */
    scale: number;
    /**
     * 主题
     *
     * 只在初始化时有效，不能动态变更
     *
     * 仅 Android 支持
     *
     * Normal 正常
     *
     * Satellite 卫星图
     *
     * 默认为 normal
     */
    theme: _MapTheme;
    /**
     * 最小缩放级别
     *
     * 默认为 3
     */
    minScale: number;
    /**
     * 最大缩放级别
     *
     * 默认为 20
     */
    maxScale: number;
    /**
     * 个性化地图配置的 style，不支持动态修改
     *
     * 默认为 1
     */
    layerStyle: string | number;
    /** 标记点数组 */
    markers: _MapMarker[];
    /** 路线 */
    polyline: _MapPolyline[];
    /** 圆 */
    circles: _MapCircle[];
    /** 控件 */
    controls: _MapControl[];
    /** 缩放视野以包含所有给定的坐标点 */
    includePoints: _MapPoint[];
    /**
     * 是否显示 3D 楼块
     *
     * 默认为 false
     */
    enable3D: boolean;
    /**
     * 是否显示指南针
     *
     * 默认为 false
     */
    showCompass: boolean;
    /**
     * 是否支持缩放
     *
     * 默认为 true
     */
    enableZoom: boolean;
    /**
     * 是否支持拖动
     *
     * 默认为 true
     */
    enableScroll: boolean;
    /**
     * 是否支持旋转
     *
     * 默认为 false
     */
    enableRotate: boolean;
    /**
     * 是否开启俯视
     *
     * 默认为 false
     */
    enableOverlooking: boolean;
    /**
     * 是否开启卫星图
     *
     * 默认为 false
     */
    enableSatellite: boolean;
    /**
     * 是否开启实时路况
     *
     * 默认为 false
     */
    enableTraffic: boolean;
    /**
     * 是否展示 POI 点
     *
     * 默认为 false
     */
    enablePoi: boolean;
    /**
     * 是否展示建筑物
     *
     * 默认为 false
     */
    enableBuilding: boolean;
    /**
     * 是否显示带有方向的当前定位点
     *
     * 默认为 false
     */
    showLocation: boolean;
    /** 多边形 */
    polygons: _MapPolygon[];
    /**
     * 是否展示室内地图
     *
     * 默认为 false
     */
    enableIndoorMap: boolean;
    /** 点击标记点时触发 */
    onMarkertap: _MapOnMarkertap;
    /** 点击 label 时触发 */
    onLabeltap: _MapOnLabeltap;
    /** 点击标记点对应的气泡时触发 */
    onCallouttap: _MapOnCallouttap;
    /** 点击控件时触发 */
    onControltap: _MapOnControltap;
    /** 视野发生变化时触发 */
    onRegionchange: _MapOnRegionchange;
    /** 点击地图时触发 */
    onTap: _MapOnTap;
    /** 地图渲染更新完成时触发 */
    onUpdated: _MapOnUpdated;
    /** 点击定位标时触发 */
    onAnchorpointtap: _MapOnAnchorpointtap;
    /** 点击地图 poi 点时触发 */
    onPoitap: _MapOnPoitap;
}>;
/** 地图组件，用于展示地图 */
type _Map = DefineComponent<_MapProps>;
/** 地图组件实例 */
type _MapInstance = InstanceType<_Map>;

declare global {
    namespace UniHelper {
        /** 显示方式 */
        type MapDisplay = _MapDisplay;
        /**
         * 文本对齐方式
         *
         * Left 左对齐
         *
         * Right 右对齐
         *
         * Center 居中对齐
         */
        type MapTextAlign = _MapTextAlign;
        /** 气泡 */
        interface MapCallout extends _MapCallout {
        }
        /** 自定义气泡 */
        interface MapCustomCallout extends _MapCustomCallout {
        }
        /** 标签 */
        interface MapLabel extends _MapLabel {
        }
        /** 锚点 */
        interface MapAnchor extends _MapAnchor {
        }
        /**
         * 纬度
         *
         * 取值范围为 -90 - 90
         */
        type MapLatitude = _MapLatitude;
        /**
         * 经度
         *
         * 取值范围为 -180 - 180
         */
        type MapLongitude = _MapLongitude;
        /** 经纬度点 */
        interface MapPoint extends _MapPoint {
        }
        /**
         * 压盖关系
         *
         * Abovelabels 显示在所有 POI 之上
         *
         * Abovebuildings 显示在楼块之上 POI 之下
         *
         * Aboveroads 显示在道路之上楼块之下
         */
        type MapLevel = _MapLevel;
        /**
         * 主题
         *
         * 只在初始化时有效，不能动态变更
         *
         * 仅 Android 支持
         *
         * Normal 正常
         *
         * Satellite 卫星图
         */
        type MapTheme = _MapTheme;
        /**
         * 标记点 ID
         *
         * Marker 点击事件回调中会返回
         *
         * 最大限制 9 位数
         */
        type MapMarkerId = _MapMarkerId;
        /** 标记点 */
        interface MapMarker extends _MapMarker {
        }
        /** 路线 */
        interface MapPolyline extends _MapPolyline {
        }
        /** 多边形 */
        interface MapPolygon extends _MapPolygon {
        }
        /** 圆 */
        interface MapCircle extends _MapCircle {
        }
        /** 控件在地图的位置 */
        interface MapPosition extends _MapPosition {
        }
        /**
         * 控件 ID
         *
         * 在控件点击事件回调中会返回
         */
        type MapControlId = _MapControlId;
        /** 控件 */
        interface MapControl extends _MapControl {
        }
        interface MapOnMarkertapDetail extends _MapOnMarkertapDetail {
        }
        type MapOnMarkertapEvent = _MapOnMarkertapEvent;
        /** 点击标记点时触发 */
        interface MapOnMarkertap extends _MapOnMarkertap {
        }
        interface MapOnLabeltapDetail extends _MapOnLabeltapDetail {
        }
        type MapOnLabeltapEvent = _MapOnLabeltapEvent;
        /** 点击 label 时触发 */
        interface MapOnLabeltap extends _MapOnLabeltap {
        }
        interface MapOnCallouttapDetail extends _MapOnCallouttapDetail {
        }
        type MapOnCallouttapEvent = _MapOnCallouttapEvent;
        /** 点击标记点对应的气泡时触发 */
        interface MapOnCallouttap extends _MapOnCallouttap {
        }
        interface MapOnControltapDetail extends _MapOnControltapDetail {
        }
        type MapOnControltapEvent = _MapOnControltapEvent;
        /** 点击控件时触发 */
        interface MapOnControltap extends _MapOnControltap {
        }
        type MapOnRegionchangeEvent = _MapOnRegionchangeEvent;
        /** 视野发生变化时触发 */
        interface MapOnRegionchange extends _MapOnRegionchange {
        }
        type MapOnTapEvent = _MapOnTapEvent;
        /** 点击地图时触发 */
        interface MapOnTap extends _MapOnTap {
        }
        type MapOnUpdatedEvent = _MapOnUpdatedEvent;
        /** 地图渲染更新完成时触发 */
        interface MapOnUpdated extends _MapOnUpdated {
        }
        interface MapOnAnchorpointtapDetail extends _MapOnAnchorpointtapDetail {
        }
        type MapOnAnchorpointtapEvent = _MapOnAnchorpointtapEvent;
        /** 点击定位标时触发 */
        interface MapOnAnchorpointtap extends _MapOnAnchorpointtap {
        }
        interface MapOnPoitapDetail extends _MapOnPoitapDetail {
        }
        type MapOnPoitapEvent = _MapOnPoitapEvent;
        /** 点击地图 poi 点时触发 */
        interface MapOnPoitap extends _MapOnPoitap {
        }
        /** 地图属性 */
        type MapProps = _MapProps;
        /** 地图组件，用于展示地图 */
        type Map = _Map;
        /** 地图组件实例 */
        type MapInstance = _MapInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 地图组件，用于展示地图
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/map.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        map: _Map;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 地图组件，用于展示地图
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/map.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            map: _Map;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 地图组件，用于展示地图
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/map.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            map: _Map;
        }
    }
}

/** 类型 */
type _CanvasType = "2d" | "webgl";
type _CanvasOnTouchstartEvent = _TouchCanvasEvent;
/** 手指触摸动作开始时触发 */
type _CanvasOnTouchstart = (event: _CanvasOnTouchstartEvent) => void;
type _CanvasOnTouchmoveEvent = _TouchCanvasEvent;
/** 手指触摸后移动时触发 */
type _CanvasOnTouchmove = (event: _CanvasOnTouchmoveEvent) => void;
type _CanvasOnTouchendEvent = _TouchCanvasEvent;
/** 手指触摸动作结束时触发 */
type _CanvasOnTouchend = (event: _CanvasOnTouchendEvent) => void;
type _CanvasOnTouchcancelEvent = _TouchCanvasEvent;
/** 手指触摸动作被打断时触发 */
type _CanvasOnTouchcancel = (event: _CanvasOnTouchcancelEvent) => void;
type _CanvasOnLongtapEvent = _BaseEvent;
/** 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 */
type _CanvasOnLongtap = (event: _CanvasOnLongtapEvent) => void;
interface _CanvasOnErrorDetail {
    /** 错误信息 */
    errMsg: string;
}
type _CanvasOnErrorEvent = _CustomEvent<_CanvasOnErrorDetail>;
/** 发生错误时触发 */
type _CanvasOnError = (event: _CanvasOnErrorEvent) => void;
/** 画布属性 */
type _CanvasProps = CommonProps & Partial<{
    /** 类型 */
    type: _CanvasType;
    /** 唯一标识符 */
    canvasId: string;
    /**
     * 当在 canvas 中移动时且有绑定手势事件时，是否禁止屏幕滚动以及下拉刷新
     *
     * 默认为 false
     */
    disableScroll: boolean;
    /**
     * 是否启用高清处理
     *
     * 默认为 true
     */
    hidpi: boolean;
    /** 手指触摸动作开始时触发 */
    onTouchstart: _CanvasOnTouchstart;
    /** 手指触摸后移动时触发 */
    onTouchmove: _CanvasOnTouchmove;
    /** 手指触摸动作结束时触发 */
    onTouchend: _CanvasOnTouchend;
    /** 手指触摸动作被打断时触发 */
    onTouchcancel: _CanvasOnTouchcancel;
    /** 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 */
    onLongtap: _CanvasOnLongtap;
    /** 发生错误时触发 */
    onError: _CanvasOnError;
}>;
/** 画布 */
type _Canvas = DefineComponent<_CanvasProps>;
/** 画布实例 */
type _CanvasInstance = InstanceType<_Canvas>;

declare global {
    namespace UniHelper {
        /** 类型 */
        type CanvasType = _CanvasType;
        type CanvasOnTouchstartEvent = _CanvasOnTouchstartEvent;
        /** 手指触摸动作开始时触发 */
        interface CanvasOnTouchstart extends _CanvasOnTouchstart {
        }
        type CanvasOnTouchmoveEvent = _CanvasOnTouchmoveEvent;
        /** 手指触摸后移动时触发 */
        interface CanvasOnTouchmove extends _CanvasOnTouchmove {
        }
        type CanvasOnTouchendEvent = _CanvasOnTouchendEvent;
        /** 手指触摸动作结束时触发 */
        interface CanvasOnTouchend extends _CanvasOnTouchend {
        }
        type CanvasOnTouchcancelEvent = _CanvasOnTouchcancelEvent;
        /** 手指触摸动作被打断时触发 */
        interface CanvasOnTouchcancel extends _CanvasOnTouchcancel {
        }
        type CanvasOnLongtapEvent = _CanvasOnLongtapEvent;
        /** 手指长按 500ms 之后触发，触发了长按事件后进行移动不会触发屏幕的滚动 */
        interface CanvasOnLongtap extends _CanvasOnLongtap {
        }
        interface CanvasOnErrorDetail extends _CanvasOnErrorDetail {
        }
        type CanvasOnErrorEvent = _CanvasOnErrorEvent;
        /** 发生错误时触发 */
        interface CanvasOnError extends _CanvasOnError {
        }
        /** 画布属性 */
        type CanvasProps = _CanvasProps;
        /** 画布 */
        type Canvas = _Canvas;
        /** 画布实例 */
        type CanvasInstance = _CanvasInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 画布
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/canvas.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        canvas: _Canvas;
    }
}
declare global {
    namespace JSX {
        interface IntrinsicElements {
            /** 画布
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/canvas.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            canvas: _Canvas;
        }
    }
}
declare module "vue/jsx-runtime" {
    namespace JSX {
        interface IntrinsicElements {
            /** 画布
             * ***
             * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/canvas.html)
             * |
             * [使用说明](https://uni-typed.netlify.app/)
             */
            canvas: _Canvas;
        }
    }
}

/** 样式 */
interface _WebViewStyles {
    /**
     * 进度条样式
     *
     * 仅加载网络 HTML 时生效
     *
     * 设置为 false 时禁用进度条
     *
     * 默认为 { color: '#00ff00' }
     */
    progress?: boolean | {
        color?: string;
    };
    /** 组件宽度 */
    width?: string;
    /** 组件高度 */
    height?: string;
}
interface _WebViewOnMessageDetail {
    data: any[];
}
type _WebViewOnMessageEvent = _CustomEvent<_WebViewOnMessageDetail>;
/** 网页向应用 postMessage 时，会在特定时机（后退、组件销毁、分享）触发并收到消息 */
type _WebViewOnMessage = (event: _WebViewOnMessageEvent) => void;
type _WebViewOnOnPostMessageEvent = _BaseEvent;
/** 网页向应用实时 postMessage */
type _WebViewOnOnPostMessage = (event: _WebViewOnOnPostMessageEvent) => void;
/** Web 浏览器组件属性 */
type _WebViewProps = CommonProps & Partial<{
    /** 指向网页的链接 */
    src: string;
    /** 用于为 iframe 指定其特征策略 */
    allow: string;
    /** 该属性对呈现在 iframe 框架中的内容启用一些额外的限制条件 */
    sandbox: string;
    /** 样式 */
    webviewStyles: _WebViewStyles;
    /** 是否自动更新当前页面标题 */
    updateTitle: boolean;
    /** 网页向应用 postMessage 时，会在特定时机（后退、组件销毁、分享）触发并收到消息 */
    onMessage: _WebViewOnMessage;
    /** 网页向应用实时 postMessage */
    onOnPostMessage: _WebViewOnOnPostMessage;
}>;
/** Web 浏览器组件，可承载网页 */
type _WebView = DefineComponent<_WebViewProps>;
/** Web 浏览器组件实例 */
type _WebViewInstance = InstanceType<_WebView>;

declare global {
    namespace UniHelper {
        /** 样式 */
        interface WebViewStyles extends _WebViewStyles {
        }
        interface WebViewOnMessageDetail extends _WebViewOnMessageDetail {
        }
        type WebViewOnMessageEvent = _WebViewOnMessageEvent;
        /** 网页向应用 postMessage 时，会在特定时机（后退、组件销毁、分享）触发并收到消息 */
        interface WebViewOnMessage extends _WebViewOnMessage {
        }
        type WebViewOnOnPostMessageEvent = _WebViewOnOnPostMessageEvent;
        /** 网页向应用实时 postMessage */
        interface WebViewOnOnPostMessage extends _WebViewOnOnPostMessage {
        }
        /** Web 浏览器组件属性 */
        type WebViewProps = _WebViewProps;
        /** Web 浏览器组件，可承载网页 */
        type WebView = _WebView;
        /** Web 浏览器组件实例 */
        type WebViewInstance = _WebViewInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * Web 浏览器组件，可承载网页
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/web-view.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        WebView: _WebView;
    }
}

type _AdOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdOnLoad = (event: _AdOnLoadEvent) => void;
interface _AdOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdOnErrorEvent = _CustomEvent<_AdOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdOnError = (event: _AdOnErrorEvent) => void;
type _AdOnCloseEvent = _BaseEvent;
/** 广告关闭的回调 */
type _AdOnClose = (event: _AdOnCloseEvent) => void;
/** 信息流广告属性 */
type _AdProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string;
    /** 广告单元 id，可在小程序管理后台的流量主模块新建 */
    unitId: string;
    /**
     * 广告自动刷新的间隔时间，必须大于等于 30
     *
     * 该参数不传入时 Banner 广告不会自动刷新
     *
     * 单位为 `s`
     */
    adIntervals: number;
    /** 广告数据，优先级高于 adpid */
    data: Record<string, any>;
    /** 小程序应用 ID */
    appid: string;
    /** 小程序广告位 ID */
    apid: string;
    /**
     * Type 为 feeds 时广告左边距，必须大于 0
     *
     * 单位为 `px`
     */
    adLeft: number;
    /**
     * Type 为 feeds 时广告上边距，必须大于 0
     *
     * 单位为 `px`
     */
    adTop: number;
    /**
     * Type 为 feeds 时广告宽度，最大值为屏幕宽度，最小值为 265
     *
     * 单位为 `px`
     *
     * 默认为 `100%`
     */
    adWidth: number;
    /**
     * Type 为 feeds 时广告高度，最大值为 160，最小值为 85
     *
     * 单位为 `px`
     */
    adHeight: number;
    /** 广告类型 */
    type: string;
    /** 广告加载成功的回调 */
    onLoad: _AdOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdOnError;
    /** 广告关闭的回调 */
    onClose: _AdOnClose;
}>;
/** 信息流广告 */
type _Ad = DefineComponent<_AdProps>;
/** 信息流广告实例 */
type _AdInstance = InstanceType<_Ad>;

declare global {
    namespace UniHelper {
        type AdOnLoadEvent = _AdOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdOnLoad extends _AdOnLoad {
        }
        interface AdOnErrorDetail extends _AdOnErrorDetail {
        }
        type AdOnErrorEvent = _AdOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdOnError extends _AdOnError {
        }
        type AdOnCloseEvent = _AdOnCloseEvent;
        /** 广告关闭的回调 */
        interface AdOnClose extends _AdOnClose {
        }
        /** 信息流广告属性 */
        type AdProps = _AdProps;
        /** 信息流广告 */
        type Ad = _Ad;
        /** 信息流广告实例 */
        type AdInstance = _AdInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 信息流广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-component.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        ad: _Ad;
    }
}

type _AdContentPageOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdContentPageOnLoad = (event: _AdContentPageOnLoadEvent) => void;
interface _AdContentPageOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdContentPageOnErrorEvent = _CustomEvent<_AdContentPageOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdContentPageOnError = (event: _AdContentPageOnErrorEvent) => void;
interface _AdContentPageOnStartDetail {
    /** 广告唯一标识 */
    id: string;
    /**
     * 广告类型
     *
     * `0` 未知类型
     *
     * `1` 普通信息流
     *
     * `2` sdk 内部广告
     *
     * `3` 第三方广告
     *
     * `4` 直播
     */
    type: 0 | 1 | 2 | 3 | 4;
    /** 视频总时长 */
    duration: number;
}
type _AdContentPageOnStartEvent = _CustomEvent<_AdContentPageOnStartDetail>;
/** 广告开始播放时触发 */
type _AdContentPageOnStart = (event: _AdContentPageOnStartEvent) => void;
interface _AdContentPageOnPauseDetail {
    /** 广告唯一标识 */
    id: string;
    /**
     * 广告类型
     *
     * `0` 未知类型
     *
     * `1` 普通信息流
     *
     * `2` sdk 内部广告
     *
     * `3` 第三方广告
     *
     * `4` 直播
     */
    type: 0 | 1 | 2 | 3 | 4;
    /** 视频总时长 */
    duration: number;
}
type _AdContentPageOnPauseEvent = _CustomEvent<_AdContentPageOnPauseDetail>;
/** 广告暂停播放时触发 */
type _AdContentPageOnPause = (event: _AdContentPageOnPauseEvent) => void;
interface _AdContentPageOnResumeDetail {
    /** 广告唯一标识 */
    id: string;
    /**
     * 广告类型
     *
     * `0` 未知类型
     *
     * `1` 普通信息流
     *
     * `2` sdk 内部广告
     *
     * `3` 第三方广告
     *
     * `4` 直播
     */
    type: 0 | 1 | 2 | 3 | 4;
    /** 视频总时长 */
    duration: number;
}
type _AdContentPageOnResumeEvent = _CustomEvent<_AdContentPageOnResumeDetail>;
/** 广告恢复播放时触发 */
type _AdContentPageOnResume = (event: _AdContentPageOnResumeEvent) => void;
interface _AdContentPageOnCompleteDetail {
    /** 广告唯一标识 */
    id: string;
    /**
     * 广告类型
     *
     * `0` 未知类型
     *
     * `1` 普通信息流
     *
     * `2` sdk 内部广告
     *
     * `3` 第三方广告
     *
     * `4` 直播
     */
    type: 0 | 1 | 2 | 3 | 4;
    /** 视频总时长 */
    duration: number;
}
type _AdContentPageOnCompleteEvent = _CustomEvent<_AdContentPageOnCompleteDetail>;
/** 广告完成播放时触发 */
type _AdContentPageOnComplete = (event: _AdContentPageOnCompleteEvent) => void;
/** 短视频内容联盟广告属性 */
type _AdContentPageProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string;
    /** 广告加载成功的回调 */
    onLoad: _AdContentPageOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdContentPageOnError;
    /** 广告开始播放时触发 */
    onStart: _AdContentPageOnStart;
    /** 广告暂停播放时触发 */
    onPause: _AdContentPageOnPause;
    /** 广告恢复播放时触发 */
    onResume: _AdContentPageOnResume;
    /** 广告完成播放时触发 */
    onComplete: _AdContentPageOnComplete;
}>;
/** 短视频内容联盟广告 */
type _AdContentPage = DefineComponent<_AdContentPageProps>;
/** 短视频内容联盟广告实例 */
type _AdContentPageInstance = InstanceType<_AdContentPage>;

declare global {
    namespace UniHelper {
        type AdContentPageOnLoadEvent = _AdContentPageOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdContentPageOnLoad extends _AdContentPageOnLoad {
        }
        interface AdContentPageOnErrorDetail extends _AdContentPageOnErrorDetail {
        }
        type AdContentPageOnErrorEvent = _AdContentPageOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdContentPageOnError extends _AdContentPageOnError {
        }
        interface AdContentPageOnStartDetail extends _AdContentPageOnStartDetail {
        }
        type AdContentPageOnStartEvent = _AdContentPageOnStartEvent;
        /** 广告开始播放时触发 */
        interface AdContentPageOnStart extends _AdContentPageOnStart {
        }
        interface AdContentPageOnPauseDetail extends _AdContentPageOnPauseDetail {
        }
        type AdContentPageOnPauseEvent = _AdContentPageOnPauseEvent;
        /** 广告暂停播放时触发 */
        interface AdContentPageOnPause extends _AdContentPageOnPause {
        }
        interface AdContentPageOnResumeDetail extends _AdContentPageOnResumeDetail {
        }
        type AdContentPageOnResumeEvent = _AdContentPageOnResumeEvent;
        /** 广告恢复播放时触发 */
        interface AdContentPageOnResume extends _AdContentPageOnResume {
        }
        interface AdContentPageOnCompleteDetail extends _AdContentPageOnCompleteDetail {
        }
        type AdContentPageOnCompleteEvent = _AdContentPageOnCompleteEvent;
        /** 广告完成播放时触发 */
        interface AdContentPageOnComplete extends _AdContentPageOnComplete {
        }
        /** 短视频内容联盟广告属性 */
        type AdContentPageProps = _AdContentPageProps;
        /** 短视频内容联盟广告 */
        type AdContentPage = _AdContentPage;
        /** 短视频内容联盟广告实例 */
        type AdContentPageInstance = _AdContentPageInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 短视频内容联盟广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-content-page.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        AdContentPage: _AdContentPage;
    }
}

type _AdDrawOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdDrawOnLoad = (event: _AdDrawOnLoadEvent) => void;
interface _AdDrawOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdDrawOnErrorEvent = _CustomEvent<_AdDrawOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdDrawOnError = (event: _AdDrawOnErrorEvent) => void;
/** 沉浸视频流广告属性 */
type _AdDrawProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string;
    /** 广告数据 */
    data: Record<string, any>;
    /** 广告加载成功的回调 */
    onLoad: _AdDrawOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdDrawOnError;
}>;
/** 沉浸视频流广告 */
type _AdDraw = DefineComponent<_AdDrawProps>;
/** 沉浸视频流广告实例 */
type _AdDrawInstance = InstanceType<_AdDraw>;

declare global {
    namespace UniHelper {
        type AdDrawOnLoadEvent = _AdDrawOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdDrawOnLoad extends _AdDrawOnLoad {
        }
        interface AdDrawOnErrorDetail extends _AdDrawOnErrorDetail {
        }
        type AdDrawOnErrorEvent = _AdDrawOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdDrawOnError extends _AdDrawOnError {
        }
        /** 沉浸视频流广告属性 */
        type AdDrawProps = _AdDrawProps;
        /** 沉浸视频流广告 */
        type AdDraw = _AdDraw;
        /** 沉浸视频流广告实例 */
        type AdDrawInstance = _AdDrawInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 沉浸视频流广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-draw.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        AdDraw: _AdDraw;
    }
}

type _AdFullscreenVideoOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdFullscreenVideoOnLoad = (event: _AdFullscreenVideoOnLoadEvent) => void;
interface _AdFullscreenVideoOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdFullscreenVideoOnErrorEvent = _CustomEvent<_AdFullscreenVideoOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdFullscreenVideoOnError = (event: _AdFullscreenVideoOnErrorEvent) => void;
type _AdFullscreenVideoOnCloseEvent = _BaseEvent;
/** 广告关闭的回调 */
type _AdFullscreenVideoOnClose = (event: _AdFullscreenVideoOnCloseEvent) => void;
/** 全屏视频广告属性 */
type _AdFullscreenVideoProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string | number | (string | number)[];
    /**
     * 是否在页面就绪后加载广告数据
     *
     * 默认为 `true`
     */
    preload: boolean;
    /**
     * 是否自动加载下一条广告数据
     *
     * 默认为 false
     */
    loadnext: boolean;
    /** 广告加载成功的回调 */
    onLoad: _AdFullscreenVideoOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdFullscreenVideoOnError;
    /** 广告关闭的回调 */
    onClose: _AdFullscreenVideoOnClose;
}>;
/** 全屏视频广告 */
type _AdFullscreenVideo = DefineComponent<_AdFullscreenVideoProps>;
/** 全屏视频广告实例 */
type _AdFullscreenVideoInstance = InstanceType<_AdFullscreenVideo>;

declare global {
    namespace UniHelper {
        type AdFullscreenVideoOnLoadEvent = _AdFullscreenVideoOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdFullscreenVideoOnLoad extends _AdFullscreenVideoOnLoad {
        }
        interface AdFullscreenVideoOnErrorDetail extends _AdFullscreenVideoOnErrorDetail {
        }
        type AdFullscreenVideoOnErrorEvent = _AdFullscreenVideoOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdFullscreenVideoOnError extends _AdFullscreenVideoOnError {
        }
        type AdFullscreenVideoOnCloseEvent = _AdFullscreenVideoOnCloseEvent;
        /** 广告关闭的回调 */
        interface AdFullscreenVideoOnClose extends _AdFullscreenVideoOnClose {
        }
        /** 全屏视频广告属性 */
        type AdFullscreenVideoProps = _AdFullscreenVideoProps;
        /** 全屏视频广告 */
        type AdFullscreenVideo = _AdFullscreenVideo;
        /** 全屏视频广告实例 */
        type AdFullscreenVideoInstance = _AdFullscreenVideoInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 全屏视频广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-fullscreen-video.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        AdFullscreenVideo: _AdFullscreenVideo;
    }
}

type _AdInteractiveOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdInteractiveOnLoad = (event: _AdInteractiveOnLoadEvent) => void;
interface _AdInteractiveOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdInteractiveOnErrorEvent = _CustomEvent<_AdInteractiveOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdInteractiveOnError = (event: _AdInteractiveOnErrorEvent) => void;
/** 互动广告属性 */
type _AdInteractiveProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string;
    /** 点击广告后打开的页面路径 */
    openPagePath: string;
    /** 广告加载成功的回调 */
    onLoad: _AdInteractiveOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdInteractiveOnError;
}>;
/** 互动广告 */
type _AdInteractive = DefineComponent<_AdInteractiveProps>;
/** 互动广告实例 */
type _AdInteractiveInstance = InstanceType<_AdInteractive>;

declare global {
    namespace UniHelper {
        type AdInteractiveOnLoadEvent = _AdInteractiveOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdInteractiveOnLoad extends _AdInteractiveOnLoad {
        }
        interface AdInteractiveOnErrorDetail extends _AdInteractiveOnErrorDetail {
        }
        type AdInteractiveOnErrorEvent = _AdInteractiveOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdInteractiveOnError extends _AdInteractiveOnError {
        }
        /** 互动广告属性 */
        type AdInteractiveProps = _AdInteractiveProps;
        /** 互动广告 */
        type AdInteractive = _AdInteractive;
        /** 互动广告实例 */
        type AdInteractiveInstance = _AdInteractiveInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 互动广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-interactive.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        AdInteractive: _AdInteractive;
    }
}

type _AdInterstitialOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdInterstitialOnLoad = (event: _AdInterstitialOnLoadEvent) => void;
interface _AdInterstitialOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdInterstitialOnErrorEvent = _CustomEvent<_AdInterstitialOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdInterstitialOnError = (event: _AdInterstitialOnErrorEvent) => void;
type _AdInterstitialOnCloseEvent = _BaseEvent;
/** 广告关闭的回调 */
type _AdInterstitialOnClose = (event: _AdInterstitialOnCloseEvent) => void;
/** 插屏广告属性 */
type _AdInterstitialProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string | number | (string | number)[];
    /**
     * 是否在页面就绪后加载广告数据
     *
     * 默认为 `true`
     */
    preload: boolean;
    /**
     * 是否自动加载下一条广告数据
     *
     * 默认为 `false`
     */
    loadnext: boolean;
    /** 广告加载成功的回调 */
    onLoad: _AdInterstitialOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdInterstitialOnError;
    /** 广告关闭的回调 */
    onClose: _AdInterstitialOnClose;
}>;
/** 插屏广告 */
type _AdInterstitial = DefineComponent<_AdInterstitialProps>;
/** 插屏广告实例 */
type _AdInterstitialInstance = InstanceType<_AdInterstitial>;

declare global {
    namespace UniHelper {
        type AdInterstitialOnLoadEvent = _AdInterstitialOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdInterstitialOnLoad extends _AdInterstitialOnLoad {
        }
        interface AdInterstitialOnErrorDetail extends _AdInterstitialOnErrorDetail {
        }
        type AdInterstitialOnErrorEvent = _AdInterstitialOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdInterstitialOnError extends _AdInterstitialOnError {
        }
        type AdInterstitialOnCloseEvent = _AdInterstitialOnCloseEvent;
        /** 广告关闭的回调 */
        interface AdInterstitialOnClose extends _AdInterstitialOnClose {
        }
        /** 插屏广告属性 */
        type AdInterstitialProps = _AdInterstitialProps;
        /** 插屏广告 */
        type AdInterstitial = _AdInterstitial;
        /** 插屏广告实例 */
        type AdInterstitialInstance = _AdInterstitialInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 插屏广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-interstitial.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        AdInterstitial: _AdInterstitial;
    }
}

/** 服务器回调透传数据 */
interface _AdRewardedVideoUrlCallback {
    userId: string;
    extra: string;
}
type _AdRewardedVideoOnLoadEvent = _BaseEvent;
/** 广告加载成功的回调 */
type _AdRewardedVideoOnLoad = (event: _AdRewardedVideoOnLoadEvent) => void;
interface _AdRewardedVideoOnErrorDetail {
    /** 错误码 */
    errCode: number;
    /** 错误信息 */
    errMsg: string;
}
type _AdRewardedVideoOnErrorEvent = _CustomEvent<_AdRewardedVideoOnErrorDetail>;
/** 广告加载失败的回调 */
type _AdRewardedVideoOnError = (event: _AdRewardedVideoOnErrorEvent) => void;
type _AdRewardedVideoOnCloseEvent = _BaseEvent;
/** 广告关闭的回调 */
type _AdRewardedVideoOnClose = (event: _AdRewardedVideoOnCloseEvent) => void;
/** 激励视频广告属性 */
type _AdRewardedVideoProps = CommonProps & Partial<{
    /** APP 广告位 id */
    adpid: string | number | (string | number)[];
    /**
     * 是否在页面就绪后加载广告数据
     *
     * 默认为 `true`
     */
    preload: boolean;
    /**
     * 是否自动加载下一条广告数据
     *
     * 默认为 `false`
     */
    loadnext: boolean;
    /** 服务器回调透传数据 */
    urlCallback: _AdRewardedVideoUrlCallback;
    /** 广告加载成功的回调 */
    onLoad: _AdRewardedVideoOnLoad;
    /** 广告加载失败的回调 */
    onError: _AdRewardedVideoOnError;
    /** 广告关闭的回调 */
    onClose: _AdRewardedVideoOnClose;
}>;
/** 激励视频广告 */
type _AdRewardedVideo = DefineComponent<_AdRewardedVideoProps>;
/** 激励视频广告实例 */
type _AdRewardedVideoInstance = InstanceType<_AdRewardedVideo>;

declare global {
    namespace UniHelper {
        /** 服务器回调透传数据 */
        interface AdRewardedVideoUrlCallback extends _AdRewardedVideoUrlCallback {
        }
        type AdRewardedVideoOnLoadEvent = _AdRewardedVideoOnLoadEvent;
        /** 广告加载成功的回调 */
        interface AdRewardedVideoOnLoad extends _AdRewardedVideoOnLoad {
        }
        interface AdRewardedVideoOnErrorDetail extends _AdRewardedVideoOnErrorDetail {
        }
        type AdRewardedVideoOnErrorEvent = _AdRewardedVideoOnErrorEvent;
        /** 广告加载失败的回调 */
        interface AdRewardedVideoOnError extends _AdRewardedVideoOnError {
        }
        type AdRewardedVideoOnCloseEvent = _AdRewardedVideoOnCloseEvent;
        /** 广告关闭的回调 */
        interface AdRewardedVideoOnClose extends _AdRewardedVideoOnClose {
        }
        /** 激励视频广告属性 */
        type AdRewardedVideoProps = _AdRewardedVideoProps;
        /** 激励视频广告 */
        type AdRewardedVideo = _AdRewardedVideo;
        /** 激励视频广告实例 */
        type AdRewardedVideoInstance = _AdRewardedVideoInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 激励视频广告
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/uni-ad/ad-rewarded-video.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        AdRewardedVideo: _AdRewardedVideo;
    }
}

/**
 * 下拉背景字体、loading 图的样式
 *
 * Dark 暗色
 *
 * Light 亮色
 */
type _PageMetaBackgroundTextStyle = "dark" | "light";
interface _PageMetaOnResizeDetail {
    windowWidth: number;
    windowHeight: number;
}
type _PageMetaOnResizeEvent = _CustomEvent<_PageMetaOnResizeDetail>;
/** 页面尺寸变化时触发 */
type _PageMetaOnResize = (event: _PageMetaOnResizeEvent) => void;
interface _PageMetaOnScrollDetail {
    scrollTop: number;
}
type _PageMetaOnScrollEvent = _CustomEvent<_PageMetaOnScrollDetail>;
/** 页面滚动时触发 */
type _PageMetaOnScroll = (event: _PageMetaOnScrollEvent) => void;
type _PageMetaOnScrolldoneEvent = _BaseEvent;
/** 通过改变 scroll-top 属性来使页面滚动，页面滚动结束后触发 */
type _PageMetaOnScrolldone = (event: _PageMetaOnScrolldoneEvent) => void;
/** 页面属性配置节点属性 */
type _PageMetaProps = CommonProps & Partial<{
    /**
     * 下拉背景字体、loading 图的样式
     *
     * Dark 暗色
     *
     * Light 亮色
     */
    backgroundTextStyle: _PageMetaBackgroundTextStyle;
    /** 窗口的背景色 */
    backgroundColor: string;
    /** 顶部窗口的十六进制背景色，仅 iOS 支持 */
    backgroundColorTop: string;
    /** 底部窗口的十六进制背景色，仅 iOS 支持 */
    backgroundColorBottom: string;
    /**
     * 滚动位置，在被设置时页面会滚动到对应位置
     *
     * 单位为 px / rpx
     */
    scrollTop: string;
    /**
     * 滚动动画时长
     *
     * 默认为 300
     */
    scrollDuration: number;
    /**
     * 页面根节点样式
     *
     * 页面根节点是所有页面节点的祖先节点，相当于 HTML 中的 body 节点
     */
    pageStyle: string;
    /** 页面的根字体大小 */
    rootFontSize: string;
    /**
     * 是否开启自动下拉刷新
     *
     * 默认为 false
     */
    enablePullDownRefresh: boolean;
    /** 页面尺寸变化时触发 */
    onResize: _PageMetaOnResize;
    /** 页面滚动时触发 */
    onScroll: _PageMetaOnScroll;
    /** 通过改变 scroll-top 属性来使页面滚动，页面滚动结束后触发 */
    onScrolldone: _PageMetaOnScrolldone;
}>;
/**
 * 页面属性配置节点，用于指定页面的一些属性、监听页面事件
 *
 * 可部分替代 pages.json
 *
 * 只能是页面内的第一个节点
 */
type _PageMeta = DefineComponent<_PageMetaProps>;
/** 页面属性配置节点实例 */
type _PageMetaInstance = InstanceType<_PageMeta>;

declare global {
    namespace UniHelper {
        /**
         * 下拉背景字体、loading 图的样式
         *
         * Dark 暗色
         *
         * Light 亮色
         */
        type PageMetaBackgroundTextStyle = _PageMetaBackgroundTextStyle;
        interface PageMetaOnResizeDetail extends _PageMetaOnResizeDetail {
        }
        type PageMetaOnResizeEvent = _PageMetaOnResizeEvent;
        /** 页面尺寸变化时触发 */
        interface PageMetaOnResize extends _PageMetaOnResize {
        }
        interface PageMetaOnScrollDetail extends _PageMetaOnScrollDetail {
        }
        type PageMetaOnScrollEvent = _PageMetaOnScrollEvent;
        /** 页面滚动时触发 */
        interface PageMetaOnScroll extends _PageMetaOnScroll {
        }
        type PageMetaOnScrolldoneEvent = _PageMetaOnScrolldoneEvent;
        /** 通过改变 scroll-top 属性来使页面滚动，页面滚动结束后触发 */
        interface PageMetaOnScrolldone extends _PageMetaOnScrolldone {
        }
        /** 页面属性配置节点属性 */
        type PageMetaProps = _PageMetaProps;
        /**
         * 页面属性配置节点，用于指定页面的一些属性、监听页面事件
         *
         * 可部分替代 pages.json
         *
         * 只能是页面内的第一个节点
         */
        type PageMeta = _PageMeta;
        /** 页面属性配置节点实例 */
        type PageMetaInstance = _PageMetaInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 页面属性配置节点，用于指定页面的一些属性、监听页面事件
         *
         * 可部分替代 pages.json
         *
         * 只能是页面内的第一个节点
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/page-meta.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        PageMeta: _PageMeta;
    }
}

/**
 * 副标题文字超出显示区域时处理方式
 *
 * Clip 超出显示区域时内容裁剪
 *
 * Ellipsis 超出显示区域时尾部显示省略标记
 */
type _NavigationBarSubtitleOverflow = "clip" | "ellipsis";
/**
 * 标题对齐方式
 *
 * Center 居中对齐
 *
 * Left 左对齐
 *
 * Auto 自动
 */
type _NavigationBarTitleAlign = "center" | "left" | "auto";
/**
 * 背景图片重复方式
 *
 * BackgroundImage 设置为图片路径时有效
 *
 * Repeat 背景图片在垂直方向和水平方向平铺
 *
 * Repeat-x 背景图片在水平方向平铺，垂直方向拉伸
 *
 * Repeat-y 背景图片在垂直方向平铺，水平方向拉伸
 *
 * No-repeat 背景图片在垂直方向和水平方向都拉伸
 */
type _NavigationBarBackgroundRepeat = "repeat" | "repeat-x" | "repeat-y" | "no-repeat";
/**
 * 高斯模糊标题栏的风格
 *
 * Dark 暗风格模糊，对应 iOS 原生 UIBlurEffectStyleDark 效果
 *
 * Extralight 高亮风格模糊，对应 iOS 原生 UIBlurEffectStyleExtraLight 效果
 *
 * Light 亮风格模糊，对应 iOS 原生 UIBlurEffectStyleLight 效果
 *
 * None 无模糊效果
 */
type _NavigationBarBlurEffect = "none" | "dark" | "extralight" | "light";
/** 导航条前景颜色值，包括按钮、标题、状态栏的颜色 */
type _NavigationFrontColor = "#ffffff" | "#000000";
/** 改变导航栏颜色时的动画方式 */
type _NavigationBarColorAnimationTimingFunc = "linear" | "easeIn" | "easeOut" | "easeInOut";
/** 页面导航条配置节点属性 */
type _NavigationBarProps = CommonProps & Partial<{
    /** 导航条标题 */
    title: string;
    /**
     * 标题图标
     *
     * 仅支持本地文件路径、相对路径
     *
     * 固定宽高 34px
     *
     * 设置后标题将居左显示
     */
    titleIcon: string;
    /**
     * 标题图标圆角
     *
     * 单位为 px
     */
    titleIconRadius: string;
    /**
     * 副标题文字内容
     *
     * 设置副标题后将显示两行标题，副标题在主标题下方
     *
     * 设置副标题后将居左显示
     */
    subtitleText: string;
    /**
     * 副标题文字字体大小
     *
     * 单位为 px
     *
     * 默认为 12px
     */
    subtitleSize: string;
    /**
     * 副标题文字颜色
     *
     * 默认为主标题文字颜色
     */
    subtitleColor: string;
    /**
     * 副标题文字超出显示区域时处理方式
     *
     * Clip 超出显示区域时内容裁剪
     *
     * Ellipsis 超出显示区域时尾部显示省略标记
     *
     * 默认为 ellipsis
     */
    subtitleOverflow: _NavigationBarSubtitleOverflow;
    /**
     * 标题对齐方式
     *
     * Center 居中对齐
     *
     * Left 左对齐
     *
     * Auto 自动
     *
     * 默认 Android left，iOS center
     */
    titleAlign: _NavigationBarTitleAlign;
    /**
     * 背景图片
     *
     * 支持本地文件路径、相对路径、渐变色
     */
    backgroundImage: string;
    /**
     * 背景图片重复方式
     *
     * BackgroundImage 设置为图片路径时有效
     *
     * Repeat 背景图片在垂直方向和水平方向平铺
     *
     * Repeat-x 背景图片在水平方向平铺，垂直方向拉伸
     *
     * Repeat-y 背景图片在垂直方向平铺，水平方向拉伸
     *
     * No-repeat 背景图片在垂直方向和水平方向都拉伸
     *
     * 默认为 no-repeat
     */
    backgroundRepeat: _NavigationBarBackgroundRepeat;
    /**
     * 高斯模糊标题栏的风格
     *
     * Dark 暗风格模糊，对应 iOS 原生 UIBlurEffectStyleDark 效果
     *
     * Extralight 高亮风格模糊，对应 iOS 原生 UIBlurEffectStyleExtraLight 效果
     *
     * Light 亮风格模糊，对应 iOS 原生 UIBlurEffectStyleLight 效果
     *
     * None 无模糊效果
     *
     * 默认为 none
     */
    blurEffect: _NavigationBarBlurEffect;
    /**
     * 是否在导航条显示 loading 加载提示
     *
     * 默认为 false
     */
    loading: boolean;
    /** 导航条前景颜色值，包括按钮、标题、状态栏的颜色 */
    frontColor: _NavigationFrontColor;
    /** 导航条背景颜色值 */
    backgroundColor: string;
    /**
     * 改变导航栏颜色时的动画时长
     *
     * 默认为 0
     */
    colorAnimationDuration: number;
    /** 改变导航栏颜色时的动画方式 */
    colorAnimationTimingFunc: _NavigationBarColorAnimationTimingFunc;
}>;
/**
 * 页面导航条配置节点，用于指定导航栏的一些属性
 *
 * 只能是 page-meta 组件内的第一个节点，需要配合 page-meta 一同使用
 */
type _NavigationBar = DefineComponent<_NavigationBarProps>;
/** 页面导航条配置节点实例 */
type _NavigationBarInstance = InstanceType<_NavigationBar>;

declare global {
    namespace UniHelper {
        /**
         * 副标题文字超出显示区域时处理方式
         *
         * Clip 超出显示区域时内容裁剪
         *
         * Ellipsis 超出显示区域时尾部显示省略标记
         */
        type NavigationBarSubtitleOverflow = _NavigationBarSubtitleOverflow;
        /**
         * 标题对齐方式
         *
         * Center 居中对齐
         *
         * Left 左对齐
         *
         * Auto 自动
         */
        type NavigationBarTitleAlign = _NavigationBarTitleAlign;
        /**
         * 背景图片重复方式
         *
         * BackgroundImage 设置为图片路径时有效
         *
         * Repeat 背景图片在垂直方向和水平方向平铺
         *
         * Repeat-x 背景图片在水平方向平铺，垂直方向拉伸
         *
         * Repeat-y 背景图片在垂直方向平铺，水平方向拉伸
         *
         * No-repeat 背景图片在垂直方向和水平方向都拉伸
         */
        type NavigationBarBackgroundRepeat = _NavigationBarBackgroundRepeat;
        /**
         * 高斯模糊标题栏的风格
         *
         * Dark 暗风格模糊，对应 iOS 原生 UIBlurEffectStyleDark 效果
         *
         * Extralight 高亮风格模糊，对应 iOS 原生 UIBlurEffectStyleExtraLight 效果
         *
         * Light 亮风格模糊，对应 iOS 原生 UIBlurEffectStyleLight 效果
         *
         * None 无模糊效果
         */
        type NavigationBarBlurEffect = _NavigationBarBlurEffect;
        /** 导航条前景颜色值，包括按钮、标题、状态栏的颜色 */
        type NavigationFrontColor = _NavigationFrontColor;
        /** 改变导航栏颜色时的动画方式 */
        type NavigationBarColorAnimationTimingFunc = _NavigationBarColorAnimationTimingFunc;
        /** 页面导航条配置节点属性 */
        type NavigationBarProps = _NavigationBarProps;
        /**
         * 页面导航条配置节点，用于指定导航栏的一些属性
         *
         * 只能是 page-meta 组件内的第一个节点，需要配合 page-meta 一同使用
         */
        type NavigationBar = _NavigationBar;
        /** 页面导航条配置节点实例 */
        type NavigationBarInstance = _NavigationBarInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /**
         * 页面导航条配置节点，用于指定导航栏的一些属性
         *
         * 只能是 page-meta 组件内的第一个节点，需要配合 page-meta 一同使用
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/navigation-bar.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        NavigationBar: _NavigationBar;
    }
}

/**
 * 选项的排列方向
 *
 * Vertical 纵向
 *
 * Horizontal 横向
 */
type _CustomTabBarDirection = "vertical" | "horizontal";
interface _CustomTabBarOnOnTabItemTapDetail {
    /** 被点击 tabItem 的序号，从 0 开始 */
    index: number;
    /** 被点击 tabItem 的页面路径 */
    pagePath: string;
    /** 被点击 tabItem 的按钮文字 */
    text: string;
}
/** 点击事件 */
type _CustomTabBarOnOnTabItemTap = (detail: _CustomTabBarOnOnTabItemTapDetail) => void;
/** 自定义 tabBar 组件属性 */
type _CustomTabBarProps = CommonProps & Partial<{
    /**
     * 选项的排列方向
     *
     * Vertical 纵向
     *
     * Horizontal 横向
     *
     * 默认为 horizontal
     */
    direction: _CustomTabBarDirection;
    /**
     * 是否显示 icon
     *
     * 默认为 false
     */
    showIcon: boolean;
    /**
     * 选中的 tabBar 选项索引值
     *
     * 默认为 0
     */
    selected: number;
    /** 点击事件 */
    onOnTabItemTap: _CustomTabBarOnOnTabItemTap;
}>;
/** 自定义 tabBar 组件 */
type _CustomTabBar = DefineComponent<_CustomTabBarProps>;
/** 自定义 tabBar 组件实例 */
type _CustomTabBarInstance = InstanceType<_CustomTabBar>;

declare global {
    namespace UniHelper {
        /**
         * 选项的排列方向
         *
         * Vertical 纵向
         *
         * Horizontal 横向
         */
        type CustomTabBarDirection = _CustomTabBarDirection;
        interface CustomTabBarOnOnTabItemTapDetail extends _CustomTabBarOnOnTabItemTapDetail {
        }
        /** 点击事件 */
        interface CustomTabBarOnOnTabItemTap extends _CustomTabBarOnOnTabItemTap {
        }
        /** 自定义 tabBar 组件属性 */
        type CustomTabBarProps = _CustomTabBarProps;
        /** 自定义 tabBar 组件 */
        type CustomTabBar = _CustomTabBar;
        /** 自定义 tabBar 组件实例 */
        type CustomTabBarInstance = _CustomTabBarInstance;
    }
}
declare module "vue" {
    interface GlobalComponents {
        /** 自定义 tabBar 组件
         * ***
         * [👉🏻点击查看组件文档](https://uniapp.dcloud.net.cn/component/custom-tab-bar.html)
         * |
         * [使用说明](https://uni-typed.netlify.app/)
         */
        CustomTabBar: _CustomTabBar;
    }
}

export type { _Ad as Ad, _AdContentPage as AdContentPage, _AdContentPageInstance as AdContentPageInstance, _AdContentPageOnComplete as AdContentPageOnComplete, _AdContentPageOnCompleteDetail as AdContentPageOnCompleteDetail, _AdContentPageOnCompleteEvent as AdContentPageOnCompleteEvent, _AdContentPageOnError as AdContentPageOnError, _AdContentPageOnErrorDetail as AdContentPageOnErrorDetail, _AdContentPageOnErrorEvent as AdContentPageOnErrorEvent, _AdContentPageOnLoad as AdContentPageOnLoad, _AdContentPageOnLoadEvent as AdContentPageOnLoadEvent, _AdContentPageOnPause as AdContentPageOnPause, _AdContentPageOnPauseDetail as AdContentPageOnPauseDetail, _AdContentPageOnPauseEvent as AdContentPageOnPauseEvent, _AdContentPageOnResume as AdContentPageOnResume, _AdContentPageOnResumeDetail as AdContentPageOnResumeDetail, _AdContentPageOnResumeEvent as AdContentPageOnResumeEvent, _AdContentPageOnStart as AdContentPageOnStart, _AdContentPageOnStartDetail as AdContentPageOnStartDetail, _AdContentPageOnStartEvent as AdContentPageOnStartEvent, _AdContentPageProps as AdContentPageProps, _AdDraw as AdDraw, _AdDrawInstance as AdDrawInstance, _AdDrawOnError as AdDrawOnError, _AdDrawOnErrorDetail as AdDrawOnErrorDetail, _AdDrawOnErrorEvent as AdDrawOnErrorEvent, _AdDrawOnLoad as AdDrawOnLoad, _AdDrawOnLoadEvent as AdDrawOnLoadEvent, _AdDrawProps as AdDrawProps, _AdFullscreenVideo as AdFullscreenVideo, _AdFullscreenVideoInstance as AdFullscreenVideoInstance, _AdFullscreenVideoOnClose as AdFullscreenVideoOnClose, _AdFullscreenVideoOnCloseEvent as AdFullscreenVideoOnCloseEvent, _AdFullscreenVideoOnError as AdFullscreenVideoOnError, _AdFullscreenVideoOnErrorDetail as AdFullscreenVideoOnErrorDetail, _AdFullscreenVideoOnErrorEvent as AdFullscreenVideoOnErrorEvent, _AdFullscreenVideoOnLoad as AdFullscreenVideoOnLoad, _AdFullscreenVideoOnLoadEvent as AdFullscreenVideoOnLoadEvent, _AdFullscreenVideoProps as AdFullscreenVideoProps, _AdInstance as AdInstance, _AdInteractive as AdInteractive, _AdInteractiveInstance as AdInteractiveInstance, _AdInteractiveOnError as AdInteractiveOnError, _AdInteractiveOnErrorDetail as AdInteractiveOnErrorDetail, _AdInteractiveOnErrorEvent as AdInteractiveOnErrorEvent, _AdInteractiveOnLoad as AdInteractiveOnLoad, _AdInteractiveOnLoadEvent as AdInteractiveOnLoadEvent, _AdInteractiveProps as AdInteractiveProps, _AdInterstitial as AdInterstitial, _AdInterstitialInstance as AdInterstitialInstance, _AdInterstitialOnClose as AdInterstitialOnClose, _AdInterstitialOnCloseEvent as AdInterstitialOnCloseEvent, _AdInterstitialOnError as AdInterstitialOnError, _AdInterstitialOnErrorDetail as AdInterstitialOnErrorDetail, _AdInterstitialOnErrorEvent as AdInterstitialOnErrorEvent, _AdInterstitialOnLoad as AdInterstitialOnLoad, _AdInterstitialOnLoadEvent as AdInterstitialOnLoadEvent, _AdInterstitialProps as AdInterstitialProps, _AdOnClose as AdOnClose, _AdOnCloseEvent as AdOnCloseEvent, _AdOnError as AdOnError, _AdOnErrorDetail as AdOnErrorDetail, _AdOnErrorEvent as AdOnErrorEvent, _AdOnLoad as AdOnLoad, _AdOnLoadEvent as AdOnLoadEvent, _AdProps as AdProps, _AdRewardedVideo as AdRewardedVideo, _AdRewardedVideoInstance as AdRewardedVideoInstance, _AdRewardedVideoOnClose as AdRewardedVideoOnClose, _AdRewardedVideoOnCloseEvent as AdRewardedVideoOnCloseEvent, _AdRewardedVideoOnError as AdRewardedVideoOnError, _AdRewardedVideoOnErrorDetail as AdRewardedVideoOnErrorDetail, _AdRewardedVideoOnErrorEvent as AdRewardedVideoOnErrorEvent, _AdRewardedVideoOnLoad as AdRewardedVideoOnLoad, _AdRewardedVideoOnLoadEvent as AdRewardedVideoOnLoadEvent, _AdRewardedVideoProps as AdRewardedVideoProps, _AdRewardedVideoUrlCallback as AdRewardedVideoUrlCallback, _Audio as Audio, _AudioInstance as AudioInstance, _AudioOnEnded as AudioOnEnded, _AudioOnEndedEvent as AudioOnEndedEvent, _AudioOnError as AudioOnError, _AudioOnErrorDetail as AudioOnErrorDetail, _AudioOnErrorEvent as AudioOnErrorEvent, _AudioOnPause as AudioOnPause, _AudioOnPauseEvent as AudioOnPauseEvent, _AudioOnPlay as AudioOnPlay, _AudioOnPlayEvent as AudioOnPlayEvent, _AudioOnTimeupdate as AudioOnTimeupdate, _AudioOnTimeupdateDetail as AudioOnTimeupdateDetail, _AudioOnTimeupdateEvent as AudioOnTimeupdateEvent, _AudioProps as AudioProps, _BaseEvent as BaseEvent, _BaseTouchEvent as BaseTouchEvent, _Button as Button, _ButtonFormType as ButtonFormType, _ButtonInstance as ButtonInstance, _ButtonLang as ButtonLang, _ButtonOnAddgroupapp as ButtonOnAddgroupapp, _ButtonOnAddgroupappEvent as ButtonOnAddgroupappEvent, _ButtonOnAgreeprivacyauthorization as ButtonOnAgreeprivacyauthorization, _ButtonOnAgreeprivacyauthorizationEvent as ButtonOnAgreeprivacyauthorizationEvent, _ButtonOnChooseaddress as ButtonOnChooseaddress, _ButtonOnChooseaddressEvent as ButtonOnChooseaddressEvent, _ButtonOnChooseavatar as ButtonOnChooseavatar, _ButtonOnChooseavatarEvent as ButtonOnChooseavatarEvent, _ButtonOnChooseinvoicetitle as ButtonOnChooseinvoicetitle, _ButtonOnChooseinvoicetitleEvent as ButtonOnChooseinvoicetitleEvent, _ButtonOnError as ButtonOnError, _ButtonOnErrorEvent as ButtonOnErrorEvent, _ButtonOnGetphonenumber as ButtonOnGetphonenumber, _ButtonOnGetphonenumberDetail as ButtonOnGetphonenumberDetail, _ButtonOnGetphonenumberEvent as ButtonOnGetphonenumberEvent, _ButtonOnLaunchapp as ButtonOnLaunchapp, _ButtonOnLaunchappEvent as ButtonOnLaunchappEvent, _ButtonOnLogin as ButtonOnLogin, _ButtonOnLoginEvent as ButtonOnLoginEvent, _ButtonOnOpensetting as ButtonOnOpensetting, _ButtonOnOpensettingDetail as ButtonOnOpensettingDetail, _ButtonOnOpensettingEvent as ButtonOnOpensettingEvent, _ButtonOnSubscribe as ButtonOnSubscribe, _ButtonOnSubscribeEvent as ButtonOnSubscribeEvent, _ButtonOpenType as ButtonOpenType, _ButtonProps as ButtonProps, _ButtonSize as ButtonSize, _ButtonType as ButtonType, _Camera as Camera, _CameraDevicePosition as CameraDevicePosition, _CameraFlash as CameraFlash, _CameraFrameSize as CameraFrameSize, _CameraInstance as CameraInstance, _CameraMode as CameraMode, _CameraOnError as CameraOnError, _CameraOnErrorEvent as CameraOnErrorEvent, _CameraOnInitdone as CameraOnInitdone, _CameraOnInitdoneDetail as CameraOnInitdoneDetail, _CameraOnInitdoneEvent as CameraOnInitdoneEvent, _CameraOnScancode as CameraOnScancode, _CameraOnScancodeEvent as CameraOnScancodeEvent, _CameraOnStop as CameraOnStop, _CameraOnStopEvent as CameraOnStopEvent, _CameraProps as CameraProps, _CameraResolution as CameraResolution, _Canvas as Canvas, _CanvasInstance as CanvasInstance, _CanvasOnError as CanvasOnError, _CanvasOnErrorDetail as CanvasOnErrorDetail, _CanvasOnErrorEvent as CanvasOnErrorEvent, _CanvasOnLongtap as CanvasOnLongtap, _CanvasOnLongtapEvent as CanvasOnLongtapEvent, _CanvasOnTouchcancel as CanvasOnTouchcancel, _CanvasOnTouchcancelEvent as CanvasOnTouchcancelEvent, _CanvasOnTouchend as CanvasOnTouchend, _CanvasOnTouchendEvent as CanvasOnTouchendEvent, _CanvasOnTouchmove as CanvasOnTouchmove, _CanvasOnTouchmoveEvent as CanvasOnTouchmoveEvent, _CanvasOnTouchstart as CanvasOnTouchstart, _CanvasOnTouchstartEvent as CanvasOnTouchstartEvent, _CanvasProps as CanvasProps, _CanvasType as CanvasType, _Checkbox as Checkbox, _CheckboxGroup as CheckboxGroup, _CheckboxGroupInstance as CheckboxGroupInstance, _CheckboxGroupOnChange as CheckboxGroupOnChange, _CheckboxGroupOnChangeDetail as CheckboxGroupOnChangeDetail, _CheckboxGroupOnChangeEvent as CheckboxGroupOnChangeEvent, _CheckboxGroupProps as CheckboxGroupProps, _CheckboxInstance as CheckboxInstance, _CheckboxProps as CheckboxProps, _CheckboxValue as CheckboxValue, _CoverImage as CoverImage, _CoverImageInstance as CoverImageInstance, _CoverImageOnError as CoverImageOnError, _CoverImageOnErrorEvent as CoverImageOnErrorEvent, _CoverImageOnLoad as CoverImageOnLoad, _CoverImageOnLoadEvent as CoverImageOnLoadEvent, _CoverImageProps as CoverImageProps, _CoverView as CoverView, _CoverViewInstance as CoverViewInstance, _CoverViewProps as CoverViewProps, _CustomEvent as CustomEvent, _CustomTabBar as CustomTabBar, _CustomTabBarDirection as CustomTabBarDirection, _CustomTabBarInstance as CustomTabBarInstance, _CustomTabBarOnOnTabItemTap as CustomTabBarOnOnTabItemTap, _CustomTabBarOnOnTabItemTapDetail as CustomTabBarOnOnTabItemTapDetail, _CustomTabBarProps as CustomTabBarProps, _DatePickerFields as DatePickerFields, _DatePickerOnCancel as DatePickerOnCancel, _DatePickerOnCancelEvent as DatePickerOnCancelEvent, _DatePickerOnChange as DatePickerOnChange, _DatePickerOnChangeDetail as DatePickerOnChangeDetail, _DatePickerOnChangeEvent as DatePickerOnChangeEvent, _DatePickerProps as DatePickerProps, _DatePickerValue as DatePickerValue, _Editor as Editor, _EditorInstance as EditorInstance, _EditorOnBlur as EditorOnBlur, _EditorOnBlurDetail as EditorOnBlurDetail, _EditorOnBlurEvent as EditorOnBlurEvent, _EditorOnFocus as EditorOnFocus, _EditorOnFocusDetail as EditorOnFocusDetail, _EditorOnFocusEvent as EditorOnFocusEvent, _EditorOnInput as EditorOnInput, _EditorOnInputDetail as EditorOnInputDetail, _EditorOnInputEvent as EditorOnInputEvent, _EditorOnReady as EditorOnReady, _EditorOnReadyEvent as EditorOnReadyEvent, _EditorOnStatuschange as EditorOnStatuschange, _EditorOnStatuschangeEvent as EditorOnStatuschangeEvent, _EditorProps as EditorProps, _EventTarget as EventTarget, _Form as Form, _FormInstance as FormInstance, _FormOnReset as FormOnReset, _FormOnResetEvent as FormOnResetEvent, _FormOnSubmit as FormOnSubmit, _FormOnSubmitDetail as FormOnSubmitDetail, _FormOnSubmitDetailValue as FormOnSubmitDetailValue, _FormOnSubmitEvent as FormOnSubmitEvent, _FormProps as FormProps, _Icon as Icon, _IconInstance as IconInstance, _IconProps as IconProps, _Image as Image, _ImageInstance as ImageInstance, _ImageMode as ImageMode, _ImageOnError as ImageOnError, _ImageOnErrorEvent as ImageOnErrorEvent, _ImageOnLoad as ImageOnLoad, _ImageOnLoadDetail as ImageOnLoadDetail, _ImageOnLoadEvent as ImageOnLoadEvent, _ImageProps as ImageProps, _Input as Input, _InputConfirmType as InputConfirmType, _InputInputMode as InputInputMode, _InputInstance as InputInstance, _InputOnBlur as InputOnBlur, _InputOnBlurDetail as InputOnBlurDetail, _InputOnBlurEvent as InputOnBlurEvent, _InputOnConfirm as InputOnConfirm, _InputOnConfirmDetail as InputOnConfirmDetail, _InputOnConfirmEvent as InputOnConfirmEvent, _InputOnFocus as InputOnFocus, _InputOnFocusDetail as InputOnFocusDetail, _InputOnFocusEvent as InputOnFocusEvent, _InputOnInput as InputOnInput, _InputOnInputDetail as InputOnInputDetail, _InputOnInputEvent as InputOnInputEvent, _InputOnKeyboardheightchange as InputOnKeyboardheightchange, _InputOnKeyboardheightchangeDetail as InputOnKeyboardheightchangeDetail, _InputOnKeyboardheightchangeEvent as InputOnKeyboardheightchangeEvent, _InputProps as InputProps, _InputTextContentType as InputTextContentType, _InputType as InputType, _InputValue as InputValue, _Label as Label, _LabelInstance as LabelInstance, _LabelProps as LabelProps, _LivePlayer as LivePlayer, _LivePlayerCode as LivePlayerCode, _LivePlayerInfo as LivePlayerInfo, _LivePlayerInstance as LivePlayerInstance, _LivePlayerMode as LivePlayerMode, _LivePlayerObjectFit as LivePlayerObjectFit, _LivePlayerOnAudiovolumenotify as LivePlayerOnAudiovolumenotify, _LivePlayerOnAudiovolumenotifyEvent as LivePlayerOnAudiovolumenotifyEvent, _LivePlayerOnEnterpictureinpicture as LivePlayerOnEnterpictureinpicture, _LivePlayerOnEnterpictureinpictureEvent as LivePlayerOnEnterpictureinpictureEvent, _LivePlayerOnFullscreenchange as LivePlayerOnFullscreenchange, _LivePlayerOnFullscreenchangeDetail as LivePlayerOnFullscreenchangeDetail, _LivePlayerOnFullscreenchangeEvent as LivePlayerOnFullscreenchangeEvent, _LivePlayerOnLeavepictureinpicture as LivePlayerOnLeavepictureinpicture, _LivePlayerOnLeavepictureinpictureEvent as LivePlayerOnLeavepictureinpictureEvent, _LivePlayerOnNetstatus as LivePlayerOnNetstatus, _LivePlayerOnNetstatusDetail as LivePlayerOnNetstatusDetail, _LivePlayerOnNetstatusEvent as LivePlayerOnNetstatusEvent, _LivePlayerOnStatechange as LivePlayerOnStatechange, _LivePlayerOnStatechangeDetail as LivePlayerOnStatechangeDetail, _LivePlayerOnStatechangeEvent as LivePlayerOnStatechangeEvent, _LivePlayerOrientation as LivePlayerOrientation, _LivePlayerPictureInPictureMode as LivePlayerPictureInPictureMode, _LivePlayerProps as LivePlayerProps, _LivePlayerSoundMode as LivePlayerSoundMode, _LivePusher as LivePusher, _LivePusherAudioQuality as LivePusherAudioQuality, _LivePusherAudioReverbType as LivePusherAudioReverbType, _LivePusherAudioVolumeType as LivePusherAudioVolumeType, _LivePusherCode as LivePusherCode, _LivePusherDevicePosition as LivePusherDevicePosition, _LivePusherInfo as LivePusherInfo, _LivePusherInstance as LivePusherInstance, _LivePusherLocalMirror as LivePusherLocalMirror, _LivePusherMode as LivePusherMode, _LivePusherOnBgmcomplete as LivePusherOnBgmcomplete, _LivePusherOnBgmcompleteEvent as LivePusherOnBgmcompleteEvent, _LivePusherOnBgmprogress as LivePusherOnBgmprogress, _LivePusherOnBgmprogressDetail as LivePusherOnBgmprogressDetail, _LivePusherOnBgmprogressEvent as LivePusherOnBgmprogressEvent, _LivePusherOnBgmstart as LivePusherOnBgmstart, _LivePusherOnBgmstartEvent as LivePusherOnBgmstartEvent, _LivePusherOnError as LivePusherOnError, _LivePusherOnErrorDetail as LivePusherOnErrorDetail, _LivePusherOnErrorEvent as LivePusherOnErrorEvent, _LivePusherOnNetstatus as LivePusherOnNetstatus, _LivePusherOnNetstatusDetail as LivePusherOnNetstatusDetail, _LivePusherOnNetstatusEvent as LivePusherOnNetstatusEvent, _LivePusherOnStatechange as LivePusherOnStatechange, _LivePusherOnStatechangeDetail as LivePusherOnStatechangeDetail, _LivePusherOnStatechangeEvent as LivePusherOnStatechangeEvent, _LivePusherOrientation as LivePusherOrientation, _LivePusherProps as LivePusherProps, _LiverPusherErrCode as LiverPusherErrCode, _Map as Map, _MapAnchor as MapAnchor, _MapCallout as MapCallout, _MapCircle as MapCircle, _MapControl as MapControl, _MapControlId as MapControlId, _MapCustomCallout as MapCustomCallout, _MapDisplay as MapDisplay, _MapInstance as MapInstance, _MapLabel as MapLabel, _MapLatitude as MapLatitude, _MapLevel as MapLevel, _MapLongitude as MapLongitude, _MapMarker as MapMarker, _MapMarkerId as MapMarkerId, _MapOnAnchorpointtap as MapOnAnchorpointtap, _MapOnAnchorpointtapDetail as MapOnAnchorpointtapDetail, _MapOnAnchorpointtapEvent as MapOnAnchorpointtapEvent, _MapOnCallouttap as MapOnCallouttap, _MapOnCallouttapDetail as MapOnCallouttapDetail, _MapOnCallouttapEvent as MapOnCallouttapEvent, _MapOnControltap as MapOnControltap, _MapOnControltapDetail as MapOnControltapDetail, _MapOnControltapEvent as MapOnControltapEvent, _MapOnLabeltap as MapOnLabeltap, _MapOnLabeltapDetail as MapOnLabeltapDetail, _MapOnLabeltapEvent as MapOnLabeltapEvent, _MapOnMarkertap as MapOnMarkertap, _MapOnMarkertapDetail as MapOnMarkertapDetail, _MapOnMarkertapEvent as MapOnMarkertapEvent, _MapOnPoitap as MapOnPoitap, _MapOnPoitapDetail as MapOnPoitapDetail, _MapOnPoitapEvent as MapOnPoitapEvent, _MapOnRegionchange as MapOnRegionchange, _MapOnRegionchangeEvent as MapOnRegionchangeEvent, _MapOnTap as MapOnTap, _MapOnTapEvent as MapOnTapEvent, _MapOnUpdated as MapOnUpdated, _MapOnUpdatedEvent as MapOnUpdatedEvent, _MapPoint as MapPoint, _MapPolygon as MapPolygon, _MapPolyline as MapPolyline, _MapPosition as MapPosition, _MapProps as MapProps, _MapTextAlign as MapTextAlign, _MapTheme as MapTheme, _MatchMedia as MatchMedia, _MatchMediaInstance as MatchMediaInstance, _MatchMediaOrientation as MatchMediaOrientation, _MatchMediaProps as MatchMediaProps, _MovableArea as MovableArea, _MovableAreaInstance as MovableAreaInstance, _MovableAreaProps as MovableAreaProps, _MovableView as MovableView, _MovableViewDirection as MovableViewDirection, _MovableViewInstance as MovableViewInstance, _MovableViewOnChange as MovableViewOnChange, _MovableViewOnChangeDetail as MovableViewOnChangeDetail, _MovableViewOnChangeEvent as MovableViewOnChangeEvent, _MovableViewOnScale as MovableViewOnScale, _MovableViewOnScaleDetail as MovableViewOnScaleDetail, _MovableViewOnScaleEvent as MovableViewOnScaleEvent, _MovableViewProps as MovableViewProps, _MovableViewSource as MovableViewSource, _MultiSelectorPickerOnCancel as MultiSelectorPickerOnCancel, _MultiSelectorPickerOnCancelEvent as MultiSelectorPickerOnCancelEvent, _MultiSelectorPickerOnChange as MultiSelectorPickerOnChange, _MultiSelectorPickerOnChangeDetail as MultiSelectorPickerOnChangeDetail, _MultiSelectorPickerOnChangeEvent as MultiSelectorPickerOnChangeEvent, _MultiSelectorPickerOnColumnchange as MultiSelectorPickerOnColumnchange, _MultiSelectorPickerOnColumnchangeDetail as MultiSelectorPickerOnColumnchangeDetail, _MultiSelectorPickerOnColumnchangeEvent as MultiSelectorPickerOnColumnchangeEvent, _MultiSelectorPickerProps as MultiSelectorPickerProps, _MultiSelectorPickerRange as MultiSelectorPickerRange, _MultiSelectorPickerValue as MultiSelectorPickerValue, _MultiSelectorPickerValueElement as MultiSelectorPickerValueElement, _NavigationBar as NavigationBar, _NavigationBarBackgroundRepeat as NavigationBarBackgroundRepeat, _NavigationBarBlurEffect as NavigationBarBlurEffect, _NavigationBarColorAnimationTimingFunc as NavigationBarColorAnimationTimingFunc, _NavigationBarInstance as NavigationBarInstance, _NavigationBarProps as NavigationBarProps, _NavigationBarSubtitleOverflow as NavigationBarSubtitleOverflow, _NavigationBarTitleAlign as NavigationBarTitleAlign, _NavigationFrontColor as NavigationFrontColor, _Navigator as Navigator, _NavigatorAnimationType as NavigatorAnimationType, _NavigatorInstance as NavigatorInstance, _NavigatorOpenType as NavigatorOpenType, _NavigatorProps as NavigatorProps, _NavigatorTarget as NavigatorTarget, _NavigatorVersion as NavigatorVersion, _PageMeta as PageMeta, _PageMetaBackgroundTextStyle as PageMetaBackgroundTextStyle, _PageMetaInstance as PageMetaInstance, _PageMetaOnResize as PageMetaOnResize, _PageMetaOnResizeDetail as PageMetaOnResizeDetail, _PageMetaOnResizeEvent as PageMetaOnResizeEvent, _PageMetaOnScroll as PageMetaOnScroll, _PageMetaOnScrollDetail as PageMetaOnScrollDetail, _PageMetaOnScrollEvent as PageMetaOnScrollEvent, _PageMetaOnScrolldone as PageMetaOnScrolldone, _PageMetaOnScrolldoneEvent as PageMetaOnScrolldoneEvent, _PageMetaProps as PageMetaProps, _Picker as Picker, _PickerInstance as PickerInstance, _PickerProps as PickerProps, _PickerValue as PickerValue, _PickerView as PickerView, _PickerViewColumn as PickerViewColumn, _PickerViewColumnInstance as PickerViewColumnInstance, _PickerViewColumnProps as PickerViewColumnProps, _PickerViewInstance as PickerViewInstance, _PickerViewOnChange as PickerViewOnChange, _PickerViewOnChangeDetail as PickerViewOnChangeDetail, _PickerViewOnChangeEvent as PickerViewOnChangeEvent, _PickerViewOnPickend as PickerViewOnPickend, _PickerViewOnPickendEvent as PickerViewOnPickendEvent, _PickerViewOnPickstart as PickerViewOnPickstart, _PickerViewOnPickstartEvent as PickerViewOnPickstartEvent, _PickerViewProps as PickerViewProps, _PickerViewValue as PickerViewValue, _PickerViewValueElement as PickerViewValueElement, _Progress as Progress, _ProgressActiveMode as ProgressActiveMode, _ProgressInstance as ProgressInstance, _ProgressOnActiveend as ProgressOnActiveend, _ProgressOnActiveendEvent as ProgressOnActiveendEvent, _ProgressProps as ProgressProps, _Radio as Radio, _RadioGroup as RadioGroup, _RadioGroupInstance as RadioGroupInstance, _RadioGroupOnChange as RadioGroupOnChange, _RadioGroupOnChangeDetail as RadioGroupOnChangeDetail, _RadioGroupOnChangeEvent as RadioGroupOnChangeEvent, _RadioGroupProps as RadioGroupProps, _RadioInstance as RadioInstance, _RadioProps as RadioProps, _RadioValue as RadioValue, _RegionPickerLevel as RegionPickerLevel, _RegionPickerOnCancel as RegionPickerOnCancel, _RegionPickerOnCancelEvent as RegionPickerOnCancelEvent, _RegionPickerOnChange as RegionPickerOnChange, _RegionPickerOnChangeDetail as RegionPickerOnChangeDetail, _RegionPickerOnChangeEvent as RegionPickerOnChangeEvent, _RegionPickerProps as RegionPickerProps, _RegionPickerValue as RegionPickerValue, _RegionPickerValueElement as RegionPickerValueElement, _RichText as RichText, _RichTextInstance as RichTextInstance, _RichTextNode as RichTextNode, _RichTextNodeNode as RichTextNodeNode, _RichTextNodes as RichTextNodes, _RichTextOnItemclick as RichTextOnItemclick, _RichTextOnItemclickEvent as RichTextOnItemclickEvent, _RichTextProps as RichTextProps, _RichTextSpace as RichTextSpace, _RichTextTextNode as RichTextTextNode, _ScrollView as ScrollView, _ScrollViewInstance as ScrollViewInstance, _ScrollViewOnRefresherabort as ScrollViewOnRefresherabort, _ScrollViewOnRefresherabortEvent as ScrollViewOnRefresherabortEvent, _ScrollViewOnRefresherpulling as ScrollViewOnRefresherpulling, _ScrollViewOnRefresherpullingEvent as ScrollViewOnRefresherpullingEvent, _ScrollViewOnRefresherrefresh as ScrollViewOnRefresherrefresh, _ScrollViewOnRefresherrefreshEvent as ScrollViewOnRefresherrefreshEvent, _ScrollViewOnRefresherrestore as ScrollViewOnRefresherrestore, _ScrollViewOnRefresherrestoreEvent as ScrollViewOnRefresherrestoreEvent, _ScrollViewOnScroll as ScrollViewOnScroll, _ScrollViewOnScrollDetail as ScrollViewOnScrollDetail, _ScrollViewOnScrollEvent as ScrollViewOnScrollEvent, _ScrollViewOnScrolltolower as ScrollViewOnScrolltolower, _ScrollViewOnScrolltolowerEvent as ScrollViewOnScrolltolowerEvent, _ScrollViewOnScrolltoupper as ScrollViewOnScrolltoupper, _ScrollViewOnScrolltoupperEvent as ScrollViewOnScrolltoupperEvent, _ScrollViewProps as ScrollViewProps, _ScrollViewRefresherDefaultStyle as ScrollViewRefresherDefaultStyle, _SelectorPickerOnCancel as SelectorPickerOnCancel, _SelectorPickerOnCancelEvent as SelectorPickerOnCancelEvent, _SelectorPickerOnChange as SelectorPickerOnChange, _SelectorPickerOnChangeDetail as SelectorPickerOnChangeDetail, _SelectorPickerOnChangeEvent as SelectorPickerOnChangeEvent, _SelectorPickerProps as SelectorPickerProps, _SelectorPickerRange as SelectorPickerRange, _SelectorPickerSelectorType as SelectorPickerSelectorType, _SelectorPickerValue as SelectorPickerValue, _Slider as Slider, _SliderInstance as SliderInstance, _SliderOnChange as SliderOnChange, _SliderOnChangeDetail as SliderOnChangeDetail, _SliderOnChangeEvent as SliderOnChangeEvent, _SliderOnChanging as SliderOnChanging, _SliderOnChangingDetail as SliderOnChangingDetail, _SliderOnChangingEvent as SliderOnChangingEvent, _SliderProps as SliderProps, _SliderValue as SliderValue, _Swiper as Swiper, _SwiperEasingFunction as SwiperEasingFunction, _SwiperInstance as SwiperInstance, _SwiperItem as SwiperItem, _SwiperItemInstance as SwiperItemInstance, _SwiperItemProps as SwiperItemProps, _SwiperOnAnimationfinish as SwiperOnAnimationfinish, _SwiperOnAnimationfinishDetail as SwiperOnAnimationfinishDetail, _SwiperOnAnimationfinishEvent as SwiperOnAnimationfinishEvent, _SwiperOnChange as SwiperOnChange, _SwiperOnChangeDetail as SwiperOnChangeDetail, _SwiperOnChangeEvent as SwiperOnChangeEvent, _SwiperOnTransition as SwiperOnTransition, _SwiperOnTransitionDetail as SwiperOnTransitionDetail, _SwiperOnTransitionEvent as SwiperOnTransitionEvent, _SwiperProps as SwiperProps, _SwiperSource as SwiperSource, _Switch as Switch, _SwitchChecked as SwitchChecked, _SwitchInstance as SwitchInstance, _SwitchOnChange as SwitchOnChange, _SwitchOnChangeDetail as SwitchOnChangeDetail, _SwitchOnChangeEvent as SwitchOnChangeEvent, _SwitchProps as SwitchProps, _SwitchType as SwitchType, _Text as Text, _TextInstance as TextInstance, _TextProps as TextProps, _TextSpace as TextSpace, _Textarea as Textarea, _TextareaConfirmType as TextareaConfirmType, _TextareaInstance as TextareaInstance, _TextareaOnBlur as TextareaOnBlur, _TextareaOnBlurDetail as TextareaOnBlurDetail, _TextareaOnBlurEvent as TextareaOnBlurEvent, _TextareaOnConfirm as TextareaOnConfirm, _TextareaOnConfirmDetail as TextareaOnConfirmDetail, _TextareaOnConfirmEvent as TextareaOnConfirmEvent, _TextareaOnFocus as TextareaOnFocus, _TextareaOnFocusDetail as TextareaOnFocusDetail, _TextareaOnFocusEvent as TextareaOnFocusEvent, _TextareaOnInput as TextareaOnInput, _TextareaOnInputDetail as TextareaOnInputDetail, _TextareaOnInputEvent as TextareaOnInputEvent, _TextareaOnKeyboardheightchange as TextareaOnKeyboardheightchange, _TextareaOnKeyboardheightchangeDetail as TextareaOnKeyboardheightchangeDetail, _TextareaOnKeyboardheightchangeEvent as TextareaOnKeyboardheightchangeEvent, _TextareaOnLinechange as TextareaOnLinechange, _TextareaOnLinechangeDetail as TextareaOnLinechangeDetail, _TextareaOnLinechangeEvent as TextareaOnLinechangeEvent, _TextareaProps as TextareaProps, _TextareaValue as TextareaValue, _TimePickerOnCancel as TimePickerOnCancel, _TimePickerOnCancelEvent as TimePickerOnCancelEvent, _TimePickerOnChange as TimePickerOnChange, _TimePickerOnChangeDetail as TimePickerOnChangeDetail, _TimePickerOnChangeEvent as TimePickerOnChangeEvent, _TimePickerProps as TimePickerProps, _TimePickerValue as TimePickerValue, _TouchCanvasDetail as TouchCanvasDetail, _TouchCanvasEvent as TouchCanvasEvent, _TouchDetail as TouchDetail, _TouchEvent as TouchEvent, _Video as Video, _VideoCodec as VideoCodec, _VideoDanmu as VideoDanmu, _VideoDirection as VideoDirection, _VideoInstance as VideoInstance, _VideoMobilenetHintType as VideoMobilenetHintType, _VideoObjectFit as VideoObjectFit, _VideoOnControlstoggle as VideoOnControlstoggle, _VideoOnControlstoggleDetail as VideoOnControlstoggleDetail, _VideoOnControlstoggleEvent as VideoOnControlstoggleEvent, _VideoOnEnded as VideoOnEnded, _VideoOnEndedEvent as VideoOnEndedEvent, _VideoOnError as VideoOnError, _VideoOnErrorEvent as VideoOnErrorEvent, _VideoOnFullscreenchange as VideoOnFullscreenchange, _VideoOnFullscreenchangeDetail as VideoOnFullscreenchangeDetail, _VideoOnFullscreenchangeEvent as VideoOnFullscreenchangeEvent, _VideoOnFullscreenclick as VideoOnFullscreenclick, _VideoOnFullscreenclickDetail as VideoOnFullscreenclickDetail, _VideoOnFullscreenclickEvent as VideoOnFullscreenclickEvent, _VideoOnLoadeddata as VideoOnLoadeddata, _VideoOnLoadeddataEvent as VideoOnLoadeddataEvent, _VideoOnLoadedmetadata as VideoOnLoadedmetadata, _VideoOnLoadedmetadataDetail as VideoOnLoadedmetadataDetail, _VideoOnLoadedmetadataEvent as VideoOnLoadedmetadataEvent, _VideoOnLoadstart as VideoOnLoadstart, _VideoOnLoadstartEvent as VideoOnLoadstartEvent, _VideoOnPause as VideoOnPause, _VideoOnPauseEvent as VideoOnPauseEvent, _VideoOnPlay as VideoOnPlay, _VideoOnPlayEvent as VideoOnPlayEvent, _VideoOnProgress as VideoOnProgress, _VideoOnProgressDetail as VideoOnProgressDetail, _VideoOnProgressEvent as VideoOnProgressEvent, _VideoOnSeeked as VideoOnSeeked, _VideoOnSeekedEvent as VideoOnSeekedEvent, _VideoOnSeeking as VideoOnSeeking, _VideoOnSeekingEvent as VideoOnSeekingEvent, _VideoOnTimeupdate as VideoOnTimeupdate, _VideoOnTimeupdateDetail as VideoOnTimeupdateDetail, _VideoOnTimeupdateEvent as VideoOnTimeupdateEvent, _VideoOnWaiting as VideoOnWaiting, _VideoOnWaitingEvent as VideoOnWaitingEvent, _VideoPlayBtnPosition as VideoPlayBtnPosition, _VideoPlayStrategy as VideoPlayStrategy, _VideoProps as VideoProps, _View as View, _ViewInstance as ViewInstance, _ViewProps as ViewProps, _WebView as WebView, _WebViewInstance as WebViewInstance, _WebViewOnMessage as WebViewOnMessage, _WebViewOnMessageDetail as WebViewOnMessageDetail, _WebViewOnMessageEvent as WebViewOnMessageEvent, _WebViewOnOnPostMessage as WebViewOnOnPostMessage, _WebViewOnOnPostMessageEvent as WebViewOnOnPostMessageEvent, _WebViewProps as WebViewProps, _WebViewStyles as WebViewStyles };
