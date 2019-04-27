# pogilvie_opt
Command line option handling utility

pogilvie_opt is insipired by the very popular [commander]() module.  I choose to
write my own.  I wanted something that would automatically enforce required arguments
instead of treating the next flag as an argument.  Example given two flags which
each require an argument.

````
sodescribe -s Account -u dev
````

Can be mistakenly typed as ...

````
sodescribe -s -u dev
`````
The commander module treats the argument of -s as -u.  Seems to be a known and
not fixable in a backward compatible way so I wrote my own.
