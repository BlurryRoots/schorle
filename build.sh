path_to_name () {
	# get name as first argument
    str=$1
    # remove path above views
    part=${str#*views/}
    # replace all / with _
    part=${part//\//_}
    # replace the mustache file name part with tpl, ids with dots are
    # problematic in it well think of css classes :/
    part=${part/.mustache/_tpl}
    # return new string
    echo "$part"
}

embrace () {
    echo "<script id=\"$1\" type=\"x-tmpl-mustache\">$2</script>"
}

scripts=""
for template in $(find ./ -name *mustache); do
    scripts="$scripts$(embrace $(path_to_name $template) "$(cat $template)")"
done

## building steps

# clean up
rm -rf build
mkdir build

# build main file
cp src/main.js build/main.js
for i in $(sed -rn "s/#include\('([^';\(\)]*)'\);/\1/p" src/main.js); do
    main=$(cat build/main.js)
    pattern="\#include(\'$i\');"
    file=$(cat src/lib/$i)
    echo "${main/$pattern/$file}" > build/main.js
done

# build index file
index=$(cat src/index.html)
echo "${index/§.templates/$scripts}" > build/index.html