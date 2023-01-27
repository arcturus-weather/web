declare const _sfc_main: import("vue").DefineComponent<{
    name: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
        default: number;
    };
}, {
    props: any;
    iconSize: import("vue").ComputedRef<string>;
    type: import("vue").ComputedRef<"warnings" | "weathers">;
    name: import("vue").ComputedRef<string | undefined>;
    symbolId: import("vue").ComputedRef<string>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    name: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: false;
        default: string;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
        default: number;
    };
}>>, {
    type: string;
    size: string | number;
}>;
export default _sfc_main;
