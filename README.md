# rocambole-token

Helpers to manipulate [rocambole](https://github.com/millermedeiros/rocambole) AST tokens.


## Why?

Created mainly to be used by [esindent](https://github.com/millermedeiros/esindent/) and [esformatter](https://github.com/millermedeiros/esformatter/).


## Important Notes

Right now all methods ignores the `loc` and `range` info of the tokens, this is
*by design* since updating the range and loc info on a large JS program
multiple times can be very expensive. It's *better* to write a separate tool to
*sanitize* this info and that can be executed as a separate step.

Also important to note that right now rocambole doesn't add any reference on
the token itself to the nodes that contain that token, so if you remove a token
that happens to be the `startToken` or `endToken` of any node you might have
some conflict if you start manipulating the tokens based on the `nodes`,
instead of the `token` LinkedList. - the `node.startToken` might be *detached*
from the LinkedList.


## License

Released under the MIT License.

