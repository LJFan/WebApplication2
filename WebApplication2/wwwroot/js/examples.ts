function toggleClass(element: HTMLElement, classes: string[]): string {
    try {
        if (classes?.length == 0) {
            return '<empty>';
        }
        var cl = element.classList;
        for (var i = 0; i < classes.length; i++) {
            if (cl.contains(classes[i])) {
                cl.remove(classes[i]);
                if (i + 1 < classes.length) {
                    cl.add(classes[i + 1]);
                    return classes[i + 1];
                } else {
                    return '<empty>';
                }
            }
        }
        if (classes.length > 0) {
            cl.add(classes[0]);
            return classes[0];
        }
    } catch {
        return '<failed>';
    }
}

function makeChange(self:HTMLElement, option: string, targetIdList: string[], clearIdList: string[] = []): void {
    var active = self.classList.contains('active');
    for (var clearId of clearIdList) {
        document.getElementById(clearId).classList.remove('active');
    }
    if (active) {
        self.classList.remove('active');
    } else {
        self.classList.add('active');
    }
    for (var targetId of targetIdList) {
        var obj = document.getElementById(targetId);
        for (clearId of clearIdList) {
            obj.classList.remove(clearId);
        }
        if (active) {
            obj.classList.remove(option);
        } else {
            obj.classList.add(option);
        }
    }
}

function toggleClasses(self: HTMLElement, classFilter: Record<string, string[]>) {
    let active = self.classList.contains('active');
    if (active) {
        self.classList.remove('active');
    } else {
        self.classList.add('active');
    }
    for (let path in classFilter) {
        let selectors = path.split('<');
        let ele = $(selectors[0]);
        for (let selector of selectors.slice(1)) {
            ele = ele.parent(selector);
        }
        for (let className of classFilter[path]) {
            if (active) {
                ele.removeClass(className);
            } else {
                ele.addClass(className);
            }
        }
    }
}