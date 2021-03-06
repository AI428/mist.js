/// <reference path='element.ts'/>
/// <reference path='statement.ts'/>

namespace Mist {

    /**
    * @class Emitter
    */
    export class Emitter {

        private emits: any = {};
        private obss: any = {};

        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: Statement);

        /**
        * @constructor
        * @param {} statement
        */
        constructor(statement: string);

        /**
        * @constructor
        * @param {} statement
        */
        constructor(private statement: any) {
        }

        /**
        * @param {} name
        * @param {} options
        * @returns {}
        */
        static customize(name: string, options: any = {}): Event {

            var e = document.createEvent('CustomEvent');

            e.initCustomEvent(name,
                options.bubbles || true,
                options.cancelable || true,
                options.detail);

            // {} response
            return e;
        }

        /**
        * @param {} name
        * @param {} listener
        */
        add(name: string, listener: (response: any) => void) {

            this.obss[name] || (this.obss[name] = []);
            this.obss[name].push(listener);
            this.on(name);
        }

        /**
        * @param {} name
        * @param {} response
        */
        emit(name: string, response?: any) {

            for (let i in
                this.obss[name]) {
                this.obss[name][i](response);
            }
        }

        /**
        * @param {} name
        * @param {} listener
        */
        remove(name: string, listener?: (response: any) => void) {

            var o = this.obss[name];

            function composer() {

                // composer
                var i = o.indexOf(listener);
                i < 0 || o.splice(i, 1);
            }

            // composer
            o && listener ? composer() : o = null;
        }

        /**
        * @access private
        */
        private on(name: string) {

            var o = this.emits;

            // lasting response
            o[name] || document.addEventListener(name,
                o[name] = (e: Event) => {
                    var element = e.target;
                    if (element instanceof Element) {
                        if (element.closest(this.selector())) {
                            this.emit(name, e instanceof CustomEvent ?
                                e.detail :
                                e);
                        }
                    }
                });
        }

        /**
        * @access private
        */
        private selector() {

            var response: string;

            var s = this.statement;

            // mapped
            if (s instanceof Statement) {
                // a response
                response = s.selector();
            } else {
                // a response
                response = s;
            }

            // a response
            return response;
        }
    }
}
