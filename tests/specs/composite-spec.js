define(['Composite'], function (Composite) {
    describe('Composite', function () {

        it('is an array', function () {
            var composite = new Composite();
            expect(composite instanceof Array).toBeTruthy();
        });

        it('adds items', function () {
            var composite = new Composite();
            composite.add(1);
            expect(composite.length).toBe(1);
        });

        it('removes items', function () {
            var composite = new Composite();
            composite.add(1);
            expect(composite.remove(1)).toBeTruthy();
            expect(composite.length).toBe(0);
        });


        it('propagates method calls to its components', function () {
            var composite = new Composite();
            var counter = 0;

            function Incrementer() {
                this.increment = function () {
                    counter++;
                };
            }

            composite.add(new Incrementer());
            composite.add(new Incrementer());
            composite.increment();
            expect(counter).toBe(2);
        });

        it('combines results from its components', function () {
            var composite = new Composite();
            var values = [1, 2];

            composite.add({
                getValue: function () {
                    return values[0];
                }
            });

            composite.add({
                getValue: function () {
                    return values[1];
                }
            });

            var result = composite.getValue();
            for (var i = 0; i < values.length; i++)
                expect(result[i]).toBe(values[i]);
        });

        it('passes arguments for children methods', function () {
            var composite = new Composite();
            var text = "";

            composite.add({
                concatToText: function (word) {
                    console.log(word);
                    text += word;
                }
            });

            composite.add({
                concatToText: function (word) {
                    text += word;
                }
            });

            composite.concatToText('a');
            expect(text).toBe('aa');
        });

        it('aggregates other composites', function () {
            var compositeA = new Composite();
            var compositeB = new Composite();
            var text = "";

            function Component() {
            }

            Component.prototype.concatToText = function (word) {
                text += word;
            };

            compositeA.add(new Component());
            compositeA.add(new Component());
            compositeB.add(new Component());
            compositeB.add(new Component());
            compositeA.add(compositeB);

            compositeA.concatToText('a');
            expect(text).toBe('aaaa');
        });
    });
});