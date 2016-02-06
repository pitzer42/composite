define(function () {
    function Composite() {
        Array.call(this);

        function applyInChildren(methodName) {
            return function () {
                var results = [];
                var method;
                var result;
                for (var i = 0; i < this.length; i++) {
                    method = this[i][methodName];
                    result = method.apply(this[i], arguments);
                    results.push(result);
                }
                return results;
            };
        }

        return new Proxy(this, {
            get: function (target, methodName) {
                if (methodName in target)
                    return target[methodName];
                return applyInChildren(methodName);
            }
        });
    }

    Composite.prototype = Object.create(Array.prototype);

    Composite.prototype.add = Composite.prototype.push;

    Composite.prototype.remove = function (child) {
        var index = this.indexOf(child);
        if (index > -1) {
            this.splice(index, 1);
            return true;
        }
        return false;
    };

    return Composite;
});