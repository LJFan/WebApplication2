function toggleClass(element, classes) {
    try {
        if ((classes === null || classes === void 0 ? void 0 : classes.length) == 0) {
            return '<empty>';
        }
        var cl = element.classList;
        for (var i = 0; i < classes.length; i++) {
            if (cl.contains(classes[i])) {
                cl.remove(classes[i]);
                if (i + 1 < classes.length) {
                    cl.add(classes[i + 1]);
                    return classes[i + 1];
                }
                else {
                    return '<empty>';
                }
            }
        }
        if (classes.length > 0) {
            cl.add(classes[0]);
            return classes[0];
        }
    }
    catch (_a) {
        return '<failed>';
    }
}
function makeChange(self, option, targetIdList, clearIdList) {
    if (clearIdList === void 0) { clearIdList = []; }
    var active = self.classList.contains('active');
    for (var _i = 0, clearIdList_1 = clearIdList; _i < clearIdList_1.length; _i++) {
        var clearId = clearIdList_1[_i];
        document.getElementById(clearId).classList.remove('active');
    }
    if (active) {
        self.classList.remove('active');
    }
    else {
        self.classList.add('active');
    }
    for (var _a = 0, targetIdList_1 = targetIdList; _a < targetIdList_1.length; _a++) {
        var targetId = targetIdList_1[_a];
        var obj = document.getElementById(targetId);
        for (var _b = 0, clearIdList_2 = clearIdList; _b < clearIdList_2.length; _b++) {
            clearId = clearIdList_2[_b];
            obj.classList.remove(clearId);
        }
        if (active) {
            obj.classList.remove(option);
        }
        else {
            obj.classList.add(option);
        }
    }
}
function toggleClasses(self, classFilter) {
    var active = self.classList.contains('active');
    if (active) {
        self.classList.remove('active');
    }
    else {
        self.classList.add('active');
    }
    for (var path in classFilter) {
        var selectors = path.split('<');
        var ele = $(selectors[0]);
        for (var _i = 0, _a = selectors.slice(1); _i < _a.length; _i++) {
            var selector = _a[_i];
            ele = ele.parent(selector);
        }
        for (var _b = 0, _c = classFilter[path]; _b < _c.length; _b++) {
            var className = _c[_b];
            if (active) {
                ele.removeClass(className);
            }
            else {
                ele.addClass(className);
            }
        }
    }
}
//# sourceMappingURL=examples.js.map