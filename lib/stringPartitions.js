/*
function stringPartitions(str) {
	var num = 2 ** (str.length - 1);
	var arr = [];
	var cut = true;
	var tmp = "";
	for (i = 0; i < str.length; i++) {
		tmp += str[i];
		if (cut) tmp += "-";
		cut = !cut;
	}
	return tmp;
}
*/