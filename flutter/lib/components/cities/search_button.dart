import 'package:flutter/material.dart';

class SearchButton extends StatelessWidget {
  final void Function()? onTap;

  const SearchButton({
    Key? key,
    this.onTap,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        width: double.infinity,
        height: 40,
        margin: const EdgeInsets.symmetric(vertical: 10),
        padding: const EdgeInsets.symmetric(horizontal: 10),
        alignment: Alignment.centerLeft,
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(20),
          color: const Color(0xFFf5f5f5),
        ),
        child: Row(
          children: const <Widget>[
            // 搜索图标
            Padding(
              padding: EdgeInsets.symmetric(horizontal: 5),
              child: Icon(
                Icons.search,
                color: Color(0xff878787),
              ),
            ),
            // 搜索框提示
            Text(
              "城市搜索",
              style: TextStyle(
                color: Color(0xff878787),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
