// import 'package:get/get.dart';
import 'package:flutter/material.dart';

// 城市搜索输入框
class SearchTextField extends StatelessWidget {
  final TextEditingController controller = TextEditingController();

  SearchTextField({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 40,
      padding: const EdgeInsets.symmetric(
        vertical: 5,
        horizontal: 10,
      ),
      decoration: BoxDecoration(
        color: const Color(0xfff5f5f5),
        borderRadius: BorderRadius.circular(20),
      ),
      child: TextField(
        controller: controller,
        textAlignVertical: TextAlignVertical.bottom,
        decoration: const InputDecoration(
          prefixIcon: Icon(Icons.search),
          prefixIconConstraints: BoxConstraints(),
          hintText: '输入城市名称',
          border: OutlineInputBorder(
            borderSide: BorderSide.none,
          ), // 去掉底部横线
        ),
        onSubmitted: (String value) {
          // 回车
        },
        onChanged: (String value) {
          // 输入改变
        },
      ),
    );
  }
}
