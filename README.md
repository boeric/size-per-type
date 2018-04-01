# size-per-type
Computes size and count for each file type in a directory tree.

The script recursively processes files and directories under a root directory specified by the user. The script produces total size and count of each file type present under the root. It also optionally displays a file tree. Both hidden and non-hidden directories are processed. Only non-hidden files are used for the size-per-filetype calculation.

Various output options are available. In addition to the size/count per file type, a directory tree can also be displayed (similar to the "tree" command). A raw listing of the path to each file/directory can also be generated, as well as a complete Json structure of the directory tree. 

The script uses Javascript ES-6, including promises, async/await, for-of loops, etc., and therefore requires an ES-6 compatible version of NodeJS. The script has been tested with **NodeJS version 8.10.0**

### Invocation
1. `node size-per-type .`
2. `./size-per-type .`

For the second type of invocation, make sure the script is executable by running the command `chmod +x size-per-type.js` in the directory where the script resides.

### Usage
```
Usage: ./size-per-type options target
Where target is the target root directory (default is the current directory)
Available options:
 --help   Help (this text)
 --tree   Display the file/directory tree
 --list   List all file paths
 --json   Output JSON of the file/directory tree
Example: './size-per-type.js --tree .'
```

### Example Output
```
Total directory size: 940k
Ext '': Count: 31, Size: 12k
Ext 'js': Count: 299, Size: 900k
Ext 'json': Count: 4, Size: 3.8k
Ext 'md': Count: 3, Size: 3.8k
Ext 'sample': Count: 9, Size: 15k
```

### Example Tree View
```
/Users/user/Repos/size-per-type
┗━━ .gitignore
┗━━ LICENSE
┗━━ README.md
┗━━ package-lock.json
┗━━ package.json
┗━━ size-per-type.js
┗━━ .git
    ┗━━ COMMIT_EDITMSG
    ┗━━ FETCH_HEAD
    ┗━━ HEAD
    ┗━━ ORIG_HEAD
    ┗━━ config
    ┗━━ description
    ┗━━ index
    ┗━━ branches
    ┗━━ hooks
        ┗━━ applypatch-msg.sample
        ┗━━ commit-msg.sample
        ┗━━ post-update.sample
        ┗━━ pre-applypatch.sample
        ┗━━ pre-commit.sample
        ┗━━ pre-push.sample
        ┗━━ pre-rebase.sample
        ┗━━ prepare-commit-msg.sample
        ┗━━ update.sample
    ┗━━ info
        ┗━━ exclude
    ┗━━ logs
        ┗━━ HEAD
        ┗━━ refs
            ┗━━ heads
                ┗━━ master
            ┗━━ remotes
                ┗━━ origin
                    ┗━━ master
    ┗━━ objects
        ┗━━ 28
            ┗━━ 2ea7c0ae715917210ee2fcbfcdc4a5cf3eeaef
        ┗━━ 6d
            ┗━━ db45e118b7cfe66bf6cdac01efb412e1c24e74
        ┗━━ 88
            ┗━━ 12cca327ba3291f0be39123757a7eeb23df7cd
        ┗━━ 9a
            ┗━━ e7387c05b0d2239e827e3277b0e7de4e42ab27
        ┗━━ ad
            ┗━━ 2109e0e30b5b7cc0dee3616218fb21e88bd602
        ┗━━ b7
            ┗━━ 0841ea7339cc4323edf6ce6c97fc2d4314ec2f
        ┗━━ c9
            ┗━━ b125945414a248f32f6dd9210fd371284c5734
        ┗━━ cf
            ┗━━ 38f5ae77df20aef8e4a4f007933191b5de2bf8
        ┗━━ d5
            ┗━━ f19d89b308d36ee9e27b912015b0f75ec2f03f
        ┗━━ info
        ┗━━ pack
    ┗━━ refs
        ┗━━ heads
            ┗━━ master
        ┗━━ remotes
            ┗━━ origin
                ┗━━ master
        ┗━━ tags
┗━━ node_modules
    ┗━━ d3
        ┗━━ .gitattributes
        ┗━━ .npmignore
        ┗━━ .spmignore
        ┗━━ CONTRIBUTING.md
        ┗━━ LICENSE
        ┗━━ README.md
        ┗━━ composer.json
        ┗━━ d3.js
        ┗━━ d3.min.js
        ┗━━ package.js
        ┗━━ package.json
        ┗━━ bin
            ┗━━ meteor
            ┗━━ start
            ┗━━ uglify
```
### Example File Path Listing
```
File paths:
./.gitignore (file)
./LICENSE (file)
./README.md (file)
./package-lock.json (file)
./package.json (file)
./size-per-type.js (file)
./.git (dir)
./.git/COMMIT_EDITMSG (file)
./.git/FETCH_HEAD (file)
./.git/HEAD (file)
./.git/ORIG_HEAD (file)
./.git/config (file)
./.git/description (file)
./.git/index (file)
./.git/branches (dir)
./.git/hooks (dir)
./.git/hooks/applypatch-msg.sample (file)
./.git/hooks/commit-msg.sample (file)
./.git/hooks/post-update.sample (file)
./.git/hooks/pre-applypatch.sample (file)
./.git/hooks/pre-commit.sample (file)
./.git/hooks/pre-push.sample (file)
./.git/hooks/pre-rebase.sample (file)
./.git/hooks/prepare-commit-msg.sample (file)
./.git/hooks/update.sample (file)
./.git/info (dir)
./.git/info/exclude (file)
./.git/logs (dir)
./.git/logs/HEAD (file)
./.git/logs/refs (dir)
./.git/logs/refs/heads (dir)
./.git/logs/refs/heads/master (file)
./.git/logs/refs/remotes (dir)
./.git/logs/refs/remotes/origin (dir)
./.git/logs/refs/remotes/origin/master (file)
./.git/objects (dir)
./.git/objects/28 (dir)
./.git/objects/28/2ea7c0ae715917210ee2fcbfcdc4a5cf3eeaef (file)
./.git/objects/6d (dir)
./.git/objects/6d/db45e118b7cfe66bf6cdac01efb412e1c24e74 (file)
./.git/objects/88 (dir)
./.git/objects/88/12cca327ba3291f0be39123757a7eeb23df7cd (file)
./.git/objects/9a (dir)
./.git/objects/9a/e7387c05b0d2239e827e3277b0e7de4e42ab27 (file)
./.git/objects/ad (dir)
./.git/objects/ad/2109e0e30b5b7cc0dee3616218fb21e88bd602 (file)
./.git/objects/b7 (dir)
./.git/objects/b7/0841ea7339cc4323edf6ce6c97fc2d4314ec2f (file)
./.git/objects/c9 (dir)
./.git/objects/c9/b125945414a248f32f6dd9210fd371284c5734 (file)
./.git/objects/cf (dir)
./.git/objects/cf/38f5ae77df20aef8e4a4f007933191b5de2bf8 (file)
./.git/objects/d5 (dir)
./.git/objects/d5/f19d89b308d36ee9e27b912015b0f75ec2f03f (file)
./.git/objects/info (dir)
./.git/objects/pack (dir)
./.git/refs (dir)
./.git/refs/heads (dir)
./.git/refs/heads/master (file)
./.git/refs/remotes (dir)
./.git/refs/remotes/origin (dir)
./.git/refs/remotes/origin/master (file)
./.git/refs/tags (dir)
./node_modules (dir)
./node_modules/d3 (dir)
./node_modules/d3/.gitattributes (file)
./node_modules/d3/.npmignore (file)
./node_modules/d3/.spmignore (file)
./node_modules/d3/CONTRIBUTING.md (file)
./node_modules/d3/LICENSE (file)
./node_modules/d3/README.md (file)
./node_modules/d3/composer.json (file)
./node_modules/d3/d3.js (file)
./node_modules/d3/d3.min.js (file)
./node_modules/d3/package.js (file)
./node_modules/d3/package.json (file)
./node_modules/d3/bin (dir)
./node_modules/d3/bin/meteor (file)
./node_modules/d3/bin/start (file)
./node_modules/d3/bin/uglify (file)
```

### Example JSON Output
```
JSON:
{
  "node": ".",
  "type": "dir",
  "size": 936161,
  "children": [
    {
      "node": "./.gitignore",
      "type": "file",
      "size": 31
    },
    {
      "node": "./LICENSE",
      "type": "file",
      "size": 1063
    },
    {
      "node": "./README.md",
      "type": "file",
      "size": 79
    },
    {
      "node": "./package-lock.json",
      "type": "file",
      "size": 288
    },
    {
      "node": "./package.json",
      "type": "file",
      "size": 246
    },
    {
      "node": "./size-per-type.js",
      "type": "file",
      "size": 10431
    },
    {
      "node": "./.git",
      "type": "dir",
      "size": 22507,
      "children": [
        {
          "node": "./.git/COMMIT_EDITMSG",
          "type": "file",
          "size": 15
        },
        {
          "node": "./.git/FETCH_HEAD",
          "type": "file",
          "size": 101
        },
        {
          "node": "./.git/HEAD",
          "type": "file",
          "size": 23
        },
        {
          "node": "./.git/ORIG_HEAD",
          "type": "file",
          "size": 41
        },
        {
          "node": "./.git/config",
          "type": "file",
          "size": 313
        },
        {
          "node": "./.git/description",
          "type": "file",
          "size": 73
        },
        {
          "node": "./.git/index",
          "type": "file",
          "size": 449
        },
        {
          "node": "./.git/branches",
          "type": "dir",
          "size": 0,
          "children": []
        },
        {
          "node": "./.git/hooks",
          "type": "dir",
          "size": 14778,
          "children": [
            {
              "node": "./.git/hooks/applypatch-msg.sample",
              "type": "file",
              "size": 478
            },
            {
              "node": "./.git/hooks/commit-msg.sample",
              "type": "file",
              "size": 896
            },
            {
              "node": "./.git/hooks/post-update.sample",
              "type": "file",
              "size": 189
            },
            {
              "node": "./.git/hooks/pre-applypatch.sample",
              "type": "file",
              "size": 424
            },
            {
              "node": "./.git/hooks/pre-commit.sample",
              "type": "file",
              "size": 1642
            },
            {
              "node": "./.git/hooks/pre-push.sample",
              "type": "file",
              "size": 1348
            },
            {
              "node": "./.git/hooks/pre-rebase.sample",
              "type": "file",
              "size": 4951
            },
            {
              "node": "./.git/hooks/prepare-commit-msg.sample",
              "type": "file",
              "size": 1239
            },
            {
              "node": "./.git/hooks/update.sample",
              "type": "file",
              "size": 3611
            }
          ]
        },
        {
          "node": "./.git/info",
          "type": "dir",
          "size": 250,
          "children": [
            {
              "node": "./.git/info/exclude",
              "type": "file",
              "size": 250
            }
          ]
        },
        {
          "node": "./.git/logs",
          "type": "dir",
          "size": 924,
          "children": [
            {
              "node": "./.git/logs/HEAD",
              "type": "file",
              "size": 314
            },
            {
              "node": "./.git/logs/refs",
              "type": "dir",
              "size": 610,
              "children": [
                {
                  "node": "./.git/logs/refs/heads",
                  "type": "dir",
                  "size": 314,
                  "children": [
                    {
                      "node": "./.git/logs/refs/heads/master",
                      "type": "file",
                      "size": 314
                    }
                  ]
                },
                {
                  "node": "./.git/logs/refs/remotes",
                  "type": "dir",
                  "size": 296,
                  "children": [
                    {
                      "node": "./.git/logs/refs/remotes/origin",
                      "type": "dir",
                      "size": 296,
                      "children": [
                        {
                          "node": "./.git/logs/refs/remotes/origin/master",
                          "type": "file",
                          "size": 296
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "node": "./.git/objects",
          "type": "dir",
          "size": 5458,
          "children": [
            {
              "node": "./.git/objects/28",
              "type": "dir",
              "size": 198,
              "children": [
                {
                  "node": "./.git/objects/28/2ea7c0ae715917210ee2fcbfcdc4a5cf3eeaef",
                  "type": "file",
                  "size": 198
                }
              ]
            },
            {
              "node": "./.git/objects/6d",
              "type": "dir",
              "size": 555,
              "children": [
                {
                  "node": "./.git/objects/6d/db45e118b7cfe66bf6cdac01efb412e1c24e74",
                  "type": "file",
                  "size": 555
                }
              ]
            },
            {
              "node": "./.git/objects/88",
              "type": "dir",
              "size": 123,
              "children": [
                {
                  "node": "./.git/objects/88/12cca327ba3291f0be39123757a7eeb23df7cd",
                  "type": "file",
                  "size": 123
                }
              ]
            },
            {
              "node": "./.git/objects/9a",
              "type": "dir",
              "size": 639,
              "children": [
                {
                  "node": "./.git/objects/9a/e7387c05b0d2239e827e3277b0e7de4e42ab27",
                  "type": "file",
                  "size": 639
                }
              ]
            },
            {
              "node": "./.git/objects/ad",
              "type": "dir",
              "size": 184,
              "children": [
                {
                  "node": "./.git/objects/ad/2109e0e30b5b7cc0dee3616218fb21e88bd602",
                  "type": "file",
                  "size": 184
                }
              ]
            },
            {
              "node": "./.git/objects/b7",
              "type": "dir",
              "size": 3462,
              "children": [
                {
                  "node": "./.git/objects/b7/0841ea7339cc4323edf6ce6c97fc2d4314ec2f",
                  "type": "file",
                  "size": 3462
                }
              ]
            },
            {
              "node": "./.git/objects/c9",
              "type": "dir",
              "size": 84,
              "children": [
                {
                  "node": "./.git/objects/c9/b125945414a248f32f6dd9210fd371284c5734",
                  "type": "file",
                  "size": 84
                }
              ]
            },
            {
              "node": "./.git/objects/cf",
              "type": "dir",
              "size": 166,
              "children": [
                {
                  "node": "./.git/objects/cf/38f5ae77df20aef8e4a4f007933191b5de2bf8",
                  "type": "file",
                  "size": 166
                }
              ]
            },
            {
              "node": "./.git/objects/d5",
              "type": "dir",
              "size": 47,
              "children": [
                {
                  "node": "./.git/objects/d5/f19d89b308d36ee9e27b912015b0f75ec2f03f",
                  "type": "file",
                  "size": 47
                }
              ]
            },
            {
              "node": "./.git/objects/info",
              "type": "dir",
              "size": 0,
              "children": []
            },
            {
              "node": "./.git/objects/pack",
              "type": "dir",
              "size": 0,
              "children": []
            }
          ]
        },
        {
          "node": "./.git/refs",
          "type": "dir",
          "size": 82,
          "children": [
            {
              "node": "./.git/refs/heads",
              "type": "dir",
              "size": 41,
              "children": [
                {
                  "node": "./.git/refs/heads/master",
                  "type": "file",
                  "size": 41
                }
              ]
            },
            {
              "node": "./.git/refs/remotes",
              "type": "dir",
              "size": 41,
              "children": [
                {
                  "node": "./.git/refs/remotes/origin",
                  "type": "dir",
                  "size": 41,
                  "children": [
                    {
                      "node": "./.git/refs/remotes/origin/master",
                      "type": "file",
                      "size": 41
                    }
                  ]
                }
              ]
            },
            {
              "node": "./.git/refs/tags",
              "type": "dir",
              "size": 0,
              "children": []
            }
          ]
        }
      ]
    },
    {
      "node": "./node_modules",
      "type": "dir",
      "size": 901516,
      "children": [
        {
          "node": "./node_modules/d3",
          "type": "dir",
          "size": 901516,
          "children": [
            {
              "node": "./node_modules/d3/.gitattributes",
              "type": "file",
              "size": 50
            },
            {
              "node": "./node_modules/d3/.npmignore",
              "type": "file",
              "size": 44
            },
            {
              "node": "./node_modules/d3/.spmignore",
              "type": "file",
              "size": 17
            },
            {
              "node": "./node_modules/d3/CONTRIBUTING.md",
              "type": "file",
              "size": 2794
            },
            {
              "node": "./node_modules/d3/LICENSE",
              "type": "file",
              "size": 1429
            },
            {
              "node": "./node_modules/d3/README.md",
              "type": "file",
              "size": 949
            },
            {
              "node": "./node_modules/d3/composer.json",
              "type": "file",
              "size": 614
            },
            {
              "node": "./node_modules/d3/d3.js",
              "type": "file",
              "size": 337945
            },
            {
              "node": "./node_modules/d3/d3.min.js",
              "type": "file",
              "size": 151725
            },
            {
              "node": "./node_modules/d3/package.js",
              "type": "file",
              "size": 366
            },
            {
              "node": "./node_modules/d3/package.json",
              "type": "file",
              "size": 2694
            },
            {
              "node": "./node_modules/d3/bin",
              "type": "dir",
              "size": 1609,
              "children": [
                {
                  "node": "./node_modules/d3/bin/meteor",
                  "type": "file",
                  "size": 576
                },
                {
                  "node": "./node_modules/d3/bin/start",
                  "type": "file",
                  "size": 143
                },
                {
                  "node": "./node_modules/d3/bin/uglify",
                  "type": "file",
                  "size": 890
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```
