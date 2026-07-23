# Chapter 27: IndexedDB Analysis

## 27.1 Technical Rationale for IndexedDB

Browser local storage technologies present clear trade-offs:
1. **LocalStorage**: Synchronous, limited to 5 MB per origin, string-only storage. Blocking synchronous read/write operations cause UI thread stuttering during large dataset queries.
2. **WebSQL**: Deprecated across modern browser specifications.
3. **IndexedDB**: Asynchronous, transactional, indexed NoSQL object store supporting hundreds of megabytes of binary/structured data without blocking the main UI thread.

HeartSync leverages IndexedDB as its primary data store to guarantee that patients can log thousands of blood pressure readings over decades without encountering browser storage exhaustion or UI lag.
