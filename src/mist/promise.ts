module Mist {

  /**
  * @class Promise
  * @description thenable
  */
  export class Promise {

    private err;
    private success;
    private txd;
    private txr;

    /**
    * @constructor
    * @param {} process
    */
    constructor(process) {

      var s = this.succeed;
      var e = this.erred;

      // initialize.
      this.resume();

      // lazy response.
      process(

        s.bind(this),
        e.bind(this));
    }

    /**
    * @access public
    * @static
    */
    static all(commits: any[]): Promise {

      return new Promise(

        function(

          succeed,
          erred
          ) {

          var p;
          var response = [];

          function composer(a) {

            // composer.
            if (response.push(a) > p) {

              try {
                // commit response.
                succeed(response);

              } catch (e) {

                // fail response.
                erred(e);
              }

              // initialize.
              response = [];
            }
          }

          commits.map(

            function(commit, i) {

              commit.then(composer);

              // bind response.
              p = i;
            });
        });
    }

    /**
    * @access public
    * @static
    */
    static race(commits: any[]): Promise {

      return new Promise(

        function(

          succeed,
          erred
          ) {

          // initialize.
          commits.forEach(function(commit) {

            commit.then(

              function(response) {

                try {
                  // commit response.
                  succeed(response);

                } catch (e) {

                  // fail response.
                  erred(e);
                }
              });
          });
        });
    }

    /**
    * @param {} err
    * @return {}
    */
    catch(err: (response) => any): Promise {

      return new Promise((

        succeed,
        erred
        ) => {

        // initialize.
        this.err = function(response) {

          try {
            // commit response.
            succeed(err(response));

          } catch (e) {

            // fail response.
            erred(e);
          }
        };

        // fixed response.
        this.tx();
      });
    }

    /**
    * @description for reuse
    */
    resume() {

      // initialize.
      this.txd = null;
      this.txr = null;
    }

    /**
    * @param {} success
    * @param {} err
    * @return {}
    */
    then(success: (response) => any, err?: (response) => any): Promise {

      return new Promise((

        succeed,
        erred
        ) => {

        // compose.
        this.err = erred;

        // initialize.
        this.success = function(response) {

          try {
            // commit respoonse.
            succeed(success(response));

          } catch (e) {

            // fail response.
            err ? succeed(err(e)) : erred(e);
          }
        };

        // fixed response.
        this.tx();
      });
    }

    /**
    * @param {} success
    * @param {} err
    * @return {}
    */
    when(success: (response) => any, err?: (response) => any): Promise {

      var s = (response) => {

        var p = success(response);

        // loop response.
        this.resume();

        // passthru.
        return p;
      };

      var e = err ? (response) => {

        var p = err(response);

        // loop response.
        this.resume();

        // passthru.
        return p;

      } : err;

      // {} response.
      return this.then(s, e);
    }

    /**
    * @access private
    */
    private erred(response) {

      // begin response.
      if (!this.txd) {

        var m = this.err;

        if (m) {

          // end response.
          this.txd = true;

          // fail response.
          response instanceof Object ?

            // lazy response.
            response.then ?
              response.then(m) :

              // passthru.
              m(response) :
            m(response);

        } else {

          // initialize.
          this.txr = (
            ) => {

            // fixed response.
            this.erred(response);
          }
        }
      }
    }

    /**
    * @access private
    */
    private succeed(response) {

      // begin response.
      if (!this.txd) {

        var m = this.success;

        if (m) {

          // end response.
          this.txd = true;

          // commit response.
          response instanceof Object ?

            // lazy response.
            response.then ?
              response.then(m) :

              // passthru.
              m(response) :
            m(response);

        } else {

          // initialize.
          this.txr = (
            ) => {

            // fixed response.
            this.succeed(response);
          }
        }
      }
    }

    /**
    * @access private
    */
    private tx() {

      var responsor;

      if (
        responsor = this.txr) {
        responsor();
      }
    }
  }
}
