import 'package:flutter/material.dart';

class ToggleTab extends StatefulWidget {
  const ToggleTab({
    Key? key,
    required this.onSelect, // 选中后回调
    required this.selectedIndex, // 当前选择的 tab
    required this.icons, // 图标列表
    this.height,
    this.width,
    this.backgroundColors, // 背景色
    this.selectedColor, // 选择后图标样式
    this.unSelectedColor, // 未选择的图标样式
    this.blockColors, // 滑块颜色
    this.borderRadius, // 边框圆角
  }) : super(key: key);

  final List<IconData> icons;
  final int selectedIndex;
  final double? width;
  final double? height;
  final Color? blockColors;
  final Color? backgroundColors;
  final Color? selectedColor;
  final Color? unSelectedColor;
  final Function(int)? onSelect;
  final double? borderRadius;

  @override
  _ToggleTabState createState() => _ToggleTabState();
}

class _ToggleTabState extends State<ToggleTab> {
  late int _selectIndex;

  @override
  void initState() {
    super.initState();

    if (widget.icons.length <= 1) {
      throw Exception('The number of icons should > 1');
    }

    setState(() {
      _selectIndex = widget.selectedIndex;
    });
  }

  @override
  Widget build(BuildContext context) {
    int len = widget.icons.length;

    // 没有宽度时默认 100
    double width = widget.width != null
        ? widthInPercent(widget.width!, context)
        : widthInPercent(100, context);

    double blockHeight = widget.height != null ? widget.height! - 8 : 32;

    return Container(
      padding: const EdgeInsets.all(4),
      clipBehavior: Clip.antiAlias,
      width: width + 8,
      height: widget.height ?? 40, // 默认高度
      decoration: BoxDecoration(
        color: widget.backgroundColors ?? const Color(0xffe0e0e0),
        borderRadius: BorderRadius.circular(
          widget.borderRadius ?? (widget.height ?? 40) / 2,
        ),
      ),
      child: Stack(
        alignment: Alignment.centerLeft,
        children: [
          // 滑块
          AnimatedPositioned(
            duration: const Duration(milliseconds: 100),
            curve: Curves.fastLinearToSlowEaseIn,
            left: width / len * _selectIndex,
            child: Container(
              width: width / len,
              height: blockHeight,
              decoration: BoxDecoration(
                color: widget.blockColors ?? Theme.of(context).primaryColor,
                borderRadius: BorderRadius.circular(
                  widget.borderRadius != null
                      ? widget.borderRadius! - 8
                      : blockHeight / 2,
                ),
              ),
            ),
          ),
          ListView.builder(
            itemCount: widget.icons.length,
            scrollDirection: Axis.horizontal,
            itemBuilder: (context, index) {
              return GestureDetector(
                child: Container(
                  color: Colors.transparent,
                  width: width / len,
                  height: blockHeight,
                  child: Icon(
                    widget.icons[index],
                    color: widget.selectedIndex == index
                        ? widget.selectedColor
                        : widget.unSelectedColor,
                  ),
                ),
                onTap: () {
                  if (widget.onSelect != null) {
                    widget.onSelect!(index);
                  }

                  setState(() {
                    _selectIndex = index;
                  });
                },
              );
            },
          ),
        ],
      ),
    );
  }
}

double widthInPercent(double percent, BuildContext context) {
  double toDouble = percent / 100;
  return MediaQuery.of(context).size.width * toDouble;
}
