# @iabtcf

Official JavaScript / TypeScript compliant tool suite for implementing the iab. Transparency and Consent Framework (TCF).  The essential toolkit for CMPs.

This is a mono repo containing 5 modules:

[Core](./modules/core#iabtcfcore) - For encoding/decoding TC strings and tools for handling the Global Vendor List (GVL).

[CmpApi](./modules/cmpapi#iabtcfcmpapi) - CMP in-page API (`__tcfapi()`) tool that works with the core library.

[cli](./modules/cli#iabtcfcli) - Tool to decode a TC string on the command line interface (cli).

[Testing](./modules/testing/) - Tools for testing the core library including random TCModel and GVL generators.

[Stub](./modules/stub/) - Code for the on-page `__tcfapi()` CMP stub.
