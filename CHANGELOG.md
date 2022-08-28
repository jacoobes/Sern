# Changelog

## 1.0.0 (2022-08-15)


### ⚠ BREAKING CHANGES

* improve quality of code, refactorings, QOL intellisense (#64)

### Features

* add .prettierignore and ignore README.md ([7ae5ecf](https://github.com/sern-handler/handler/commit/7ae5ecf1a64700d667e85420ae4b2eaf31781d85))
* Add castings for res ([2697e35](https://github.com/sern-handler/handler/commit/2697e35b2e5b754ea9d0d84db3720fb68b3f43db))
* Add DefinetlyDefined type, more todo statements ([c8c0c84](https://github.com/sern-handler/handler/commit/c8c0c841db2423e29d69bbc1a3ab590bfebb5d5b))
* add discord.js as a peerDependency instead ([b3ed8da](https://github.com/sern-handler/handler/commit/b3ed8da68f55b69a7fe1697cd88c552243cc637f))
* add docs/ to npmignore ([f90342d](https://github.com/sern-handler/handler/commit/f90342d6b140241f7a6a95dea71c05bf309a7a52))
* add externallyUsed.ts and support BothCommands again ([fc81bfc](https://github.com/sern-handler/handler/commit/fc81bfc6d75e4722486766715abe7271ad21cd7f))
* add feature-request.md ([#92](https://github.com/sern-handler/handler/issues/92)) ([0d6e592](https://github.com/sern-handler/handler/commit/0d6e592614f0d4eeaaa9ffe5ba245fe002f5b907))
* add frontmatter ([#95](https://github.com/sern-handler/handler/issues/95)) ([75a6a04](https://github.com/sern-handler/handler/commit/75a6a04db56551049387e38979bb7ef21356f303))
* Add messageComponent handler ([d29298c](https://github.com/sern-handler/handler/commit/d29298c17a1d67146bdddb9cf07a16924c55ed3a))
* add version.txt ([4fea383](https://github.com/sern-handler/handler/commit/4fea383519b9905c17c7679587f69b530c08cec8))
* added conventional commits ([741cf13](https://github.com/sern-handler/handler/commit/741cf13fd56ac49ebca6f73ecc3a2209f00e774d))
* Added SECURITY file & formatted some TypeScript code ([779011a](https://github.com/sern-handler/handler/commit/779011a124ab76bbfb19a2a11889bf9255cbd360))
* adding better typings, refactoring ([99e2a99](https://github.com/sern-handler/handler/commit/99e2a997edaac1ba880e56bf782ecd1fa5e96b4c))
* Adding docs to some data structures, moving to default from export files ([0ae541d](https://github.com/sern-handler/handler/commit/0ae541daba4c5d2aa3e612ab4b78fd6a858717ad))
* adding modal and autocomplete support ([77856ce](https://github.com/sern-handler/handler/commit/77856ce5d0d8d1e2e2f5a971269224a4174bc205))
* adding refactoring for repetitive event plugin processing ([475b073](https://github.com/sern-handler/handler/commit/475b0736d573bb8969b2a0eb9180231aa8618a0e))
* Adding sern event listeners, overriding and typing methods ([115d1a4](https://github.com/sern-handler/handler/commit/115d1a49b52eb45d9b68ba015f8f734b902e9a60))
* Adding TextInput map & starting event plugins for message components ([6ac9720](https://github.com/sern-handler/handler/commit/6ac9720260040afb12d232b002c28db99b18e093))
* Aliases optional ([430315a](https://github.com/sern-handler/handler/commit/430315ad02060121e75604aee40c246c71a7e8d2))
* better looking typings for modules ([53bc080](https://github.com/sern-handler/handler/commit/53bc080a290fd5064993aa0d98497d4b239ac8f3))
* broadening EventPlugin default generic type, reformat with prettier ([88dcdee](https://github.com/sern-handler/handler/commit/88dcdee818e42405234ef502087226a8c042c92f))
* CodeQL ([7012da6](https://github.com/sern-handler/handler/commit/7012da60530c2b0b5d8cc97b417a80cd8031f51f))
* delete partition.ts ([f6d584c](https://github.com/sern-handler/handler/commit/f6d584cf99abdb292985f812e64553a37ab51a01))
* Edited event names for more conciseness, finished basic event emitters ([3f64a8a](https://github.com/sern-handler/handler/commit/3f64a8aa0a47a09f822d54f2b3f03bc42faa10f7))
* finished interactionCreate.ts handling? (need test) ([97907b7](https://github.com/sern-handler/handler/commit/97907b746fc94d6e8b65e2fec1cce4b0c3160491))
* finishing autocomplete!! ([d63423c](https://github.com/sern-handler/handler/commit/d63423cfc458cb9ab07b9900a7c4d2f7ea8d71b9))
* finishing optionData for autocomplete changes, adding class for builder ([b08eebf](https://github.com/sern-handler/handler/commit/b08eebf6850acaee3b56bb1c60aec2a026a5144c))
* Finishing up autocomplete, need to test ([d50b801](https://github.com/sern-handler/handler/commit/d50b8013ee343b2be0ed232938e9f5f91c43b493))
* fix duplicate ([c5bd941](https://github.com/sern-handler/handler/commit/c5bd94131dfb20b2c69b7eeb96f3ad89d6de43f4))
* **handler:** adding higher-order-function wrappers to increase readability and shorten code ([0f0b0fb](https://github.com/sern-handler/handler/commit/0f0b0fb61c80654179e2c6d6f69e50c70114201b))
* **handler:** command plugins work?! ([70bd12d](https://github.com/sern-handler/handler/commit/70bd12dd61182f48445c707a9199421b1dba586e))
* **handler:** progress on event plugins ([2f61399](https://github.com/sern-handler/handler/commit/2f61399b5e5ad53ee3165e19cb74dd279b827b99))
* **higherorders.ts:** a new function that acts as a command options builder ([651009c](https://github.com/sern-handler/handler/commit/651009c9ed5e8e04cf44fa4438f94a9e119aa8f8))
* improve quality of code, refactorings, QOL intellisense ([#64](https://github.com/sern-handler/handler/issues/64)) ([e71b63d](https://github.com/sern-handler/handler/commit/e71b63d261d86b17ddc05fbee999f63623d8c6d1))
* Improved TypeScript experince ([dad3042](https://github.com/sern-handler/handler/commit/dad3042a644b0e47d01319f48eefe01632678cc3))
* interactionCreate.ts refactoring ([c4e8e51](https://github.com/sern-handler/handler/commit/c4e8e517b3f4bb6baca902251a0afa22b2548450))
* Making name required in auto cmp interactions ([ac8a2f4](https://github.com/sern-handler/handler/commit/ac8a2f4c86a1c426d32e388a5439a8696db52279))
* move name and description out of OptionsData[] ([93942bd](https://github.com/sern-handler/handler/commit/93942bd0e7d0ac688d20159cab2c70c3285085f4))
* Optional plugins to reduce bloat ([2b81d53](https://github.com/sern-handler/handler/commit/2b81d53503209a738b70d238512c82542d3d88e8))
* **prefix:** make defaultPrefix optional ([f6b88dc](https://github.com/sern-handler/handler/commit/f6b88dcdc80c407e14f4d6ae73eb27e75d195e18))
* **readme.md:** added basic command examples ([63b2d3a](https://github.com/sern-handler/handler/commit/63b2d3a5723ac6e1f0baa0de8b65640cecd7d634))
* remove comments about prev commit ([a220949](https://github.com/sern-handler/handler/commit/a2209494bdd05ca89176aff82f7d3afce0b8de46))
* remove copyright bloat ([48737ef](https://github.com/sern-handler/handler/commit/48737efea3c0fce572238701e72335293333379f))
* remove externallyUsed.ts ([3dec347](https://github.com/sern-handler/handler/commit/3dec347ef0957845601f0eb2acb3f1815d1e9ca1))
* Revamp Docs ([#47](https://github.com/sern-handler/handler/issues/47)) ([163e48f](https://github.com/sern-handler/handler/commit/163e48f3eb38d37500cefc8d0c722c083a3070c7))
* **sern.ts:** adding logging instead of large complaining messages from bot ([00a5fa4](https://github.com/sern-handler/handler/commit/00a5fa43ad9e0b4c7d5ef1f2772a4cb186768837))
* **sern.ts:** beginning to add new basic logger system ([ef9d53e](https://github.com/sern-handler/handler/commit/ef9d53e6b1a9009eab5ce9ff9f8b5542d1d7cf7f))
* **sern.ts:** changed how module is passed around, now has name property at runtime ([40fb723](https://github.com/sern-handler/handler/commit/40fb7231436331c97fa791eab3b8b51636e826f1))
* **sern.ts:** changing default value of args in text based cmd to string[], from string ([1397974](https://github.com/sern-handler/handler/commit/1397974fb6e6d8c1b1e82db8272ef0a57916022c))
* **sern.ts:** changing default value of args in text based cmd to string[], from string ([e0541f7](https://github.com/sern-handler/handler/commit/e0541f777bc3dcb1ec0c0cccf219b9fa66199a2b))
* **sern.ts:** changing text-based command parser fn value to string[] ([b11f999](https://github.com/sern-handler/handler/commit/b11f9996749977a16e516523af7a8e2a9e6521ae))
* **sern.ts:** renaming Module.delegate to Module.execute ([8702876](https://github.com/sern-handler/handler/commit/870287674aa7eccbe1fc890d1cf2cd808982b801))
* should be able to register other nodejs event emitters ([b8cda35](https://github.com/sern-handler/handler/commit/b8cda351e1f549422692c633255ac1d6c7d78a9b))
* shrink package size, improve dev deps, esm and cjs support ([#98](https://github.com/sern-handler/handler/issues/98)) ([74378f0](https://github.com/sern-handler/handler/commit/74378f0f12cf5d16b90ddbc01fb42505e0235c39))
* update example ([0da1b5a](https://github.com/sern-handler/handler/commit/0da1b5a4dc6823807880ade03728b466fe895190))
* Updated Readme design ([369586f](https://github.com/sern-handler/handler/commit/369586f378f807ba9906167b5ada197c2c95e411))


### Bug Fixes

* accidentally imported wildcard from wrong place & namespace ([8782cad](https://github.com/sern-handler/handler/commit/8782cad9cddbb24c03c2bfff96d3377aceb5f542))
* autocomplete in nested form ([#97](https://github.com/sern-handler/handler/issues/97)) ([70d7bdb](https://github.com/sern-handler/handler/commit/70d7bdb8c53a1990addc5c9fd54427f194833b4e))
* Change discord server link ([#62](https://github.com/sern-handler/handler/issues/62)) ([e677ce0](https://github.com/sern-handler/handler/commit/e677ce083966dedc945d236034e2ce4a7a586e05))
* **codeql-analysis.yml:** Fixed autobuild issue on some TS files & deleted more unused comments ([e51c7ff](https://github.com/sern-handler/handler/commit/e51c7ffed038f0519a37f4339406c28546d92c83))
* crash on collectors ([#89](https://github.com/sern-handler/handler/issues/89)) ([a0587f5](https://github.com/sern-handler/handler/commit/a0587f59d43d62642c033e0bb843902f9e6dc0c4))
* crash on collectors pt ([7da7bff](https://github.com/sern-handler/handler/commit/7da7bff700f8e46e72412ca5d379a6edbc14e10a))
* didn't run prettier, now i am ([6c144de](https://github.com/sern-handler/handler/commit/6c144defcacd7732e15292f6c3e5eaea7944bc32))
* Fix return type of sernModule ([cf85a5d](https://github.com/sern-handler/handler/commit/cf85a5db6413e2b8b42143f70964f7a19789e1ff))
* Fixed renovate warning ([#77](https://github.com/sern-handler/handler/issues/77)) ([76c4333](https://github.com/sern-handler/handler/commit/76c4333a817006100f0b99d73bb455e82797d3d9))
* Fixed typo in Security.md ([c35def9](https://github.com/sern-handler/handler/commit/c35def99c93e77a0c932a1b8f1da06cd45fde294))
* **handler.ts:** added the changes of Module<T>.execute to type delegate (now type execute) ([f062a33](https://github.com/sern-handler/handler/commit/f062a338687be4b3ac64c048a63bdcb895282d2d))
* linting issue in markup.ts ([dac665d](https://github.com/sern-handler/handler/commit/dac665d6281a29ec79663adb26a3e5c5243e6ae0))
* Non-exhaustiveness led to commands not registering readyEvent.ts ([b266508](https://github.com/sern-handler/handler/commit/b26650818e2c193c326356359b38412117ea6186))
* prettier changes again ([d5bb992](https://github.com/sern-handler/handler/commit/d5bb9922dfdb14e4f7e95ad5acd470765b7a90c2))
* prettier wants lf line ending ([571a804](https://github.com/sern-handler/handler/commit/571a8044b027afee91466219a841817dd55ef455))
* **sern.ts:** checking ctx instanceof Message always returned false ([7166947](https://github.com/sern-handler/handler/commit/7166947d28f3be1a6e1c44385eb7946731784f58))
* Standard for of does not resolve promises. Switched to for await ([66b9f51](https://github.com/sern-handler/handler/commit/66b9f51fa73cf07a589671d13ca4c65a9c8193a1))
* **utilexports.ts:** forgot to remove the deleted feat of option builder ([1cff46c](https://github.com/sern-handler/handler/commit/1cff46c0ab5959d8e0f0fe89f1e6cd4c6cebff19))


### Reverts

* Move enums to enums.ts ([40a10bf](https://github.com/sern-handler/handler/commit/40a10bf32b9a1c6afbf85bdaeb2a7918c15ac7a8))
* Re-add plugins overload ([b9b5919](https://github.com/sern-handler/handler/commit/b9b59197df7d9bbeac3df68ebe6f7cea1ce50677))
* remove version.txt ([ca9ac52](https://github.com/sern-handler/handler/commit/ca9ac52fae32108b4cb90b201204d5c358c5ef7b))