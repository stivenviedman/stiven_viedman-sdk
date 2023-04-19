## SDK Design

LPS design tries to be concise in its API and response objects.

Users using the methods for querying several entities will always be able to add an options object for filtering purposes, the object used in all methods is the same, which aims at lowering the complexity that usually developers find when using unstructured SDKs.

The return values are also concise for all methods. Users will always get a pair `{ error, data }` - I find this pattern particularly because it is simple and encourages healthy error-handling practices. I've used this pattern when developing applications in React (popularized by HTTP and GraphQAL clients) and Go.

Either error or data will be null. If an error occurs, it will always correspond to the same interface - this also makes it easier for developers to use.

Last but not least, LPS is open for extension and the core error handling and options parsing functionalities are both reusable and flexible. This makes it easy to support new features in the future and keep it backward compatible.

LPS at its heart tries to offer the API developers expect, one that makes sense and is fun to use, and takes very seriously its maintainability aspects.
