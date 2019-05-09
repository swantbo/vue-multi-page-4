### 多页面配置


### 情况dist目录


	npm i clean-webpack-plugin -D



报错:

	throw err
	unsafe-perm in lifecycle true
	clean-webpack-plugin only accepts an options object.


之前的代码:

	new CleanWebpackPlugin(["dist"])


最新版不用传参数:

	  /**
         * All files inside webpack's output.path directory will be removed once, but the
         * directory itself will not be. If using webpack 4+'s default configuration,
         * everything under <PROJECT_DIR>/dist/ will be removed.
         * Use cleanOnceBeforeBuildPatterns to override this behavior.
         *
         * During rebuilds, all webpack assets that are not used anymore
         * will be removed automatically.
         *
         * See `Options and Defaults` for information
         * https://github.com/johnagan/clean-webpack-plugin#options-and-defaults-optional
         */
        new CleanWebpackPlugin()


奇怪了，那它怎么知道我要删除的是哪个文件夹,难道默认删除的是dist目录下的文件。




### 转义ES6



更新到最新版本,webpack 4.x | babel-loader 8.x | babel 7.x

	npm install -D babel-loader @babel/core @babel/preset-env webpack


回退低版本:

	npm install -D babel-loader@7 babel-core babel-preset-env

会报错的:

	npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 -D



版本搭配:

	https://www.npmjs.com/package/babel-loader

	https://yq.aliyun.com/articles/641662

新建一个.babelrc

	{
	    "presets": ["env", "stage-0"]   // 从右向左解析
	}


WEBPACK的执行顺序:

　	   1、执行 plugins 中所有的插件

　　　　2、plugins 的插件，按照顺序依赖编译

　　　　3、所有 plugins 的插件执行完成，在执行 presets 预设。

　　　　4、presets 预设，按照倒序的顺序执行。(从最后一个执行)

　　　　5、完成编译



我们再在webpack里配置一下babel-loader既可以做到代码转成ES5了

	
		module.exports = {
	    module: {
	        rules: [
	            {
	                test:/\.js$/,
	                use: 'babel-loader',
	                include: /src/,          // 只转化src目录下的js
	                exclude: /node_modules/  // 排除掉node_modules，优化打包速度
	            }
	        ]
	    }
	}


发现错误:

	Cannot find module 'babel-preset-env'

解决:

	npm un babel-core
	npm un babel-preset-*

然后将

	{
	    "presets": ["env", "stage-0"]   // 从右向左解析
	}

改为:

	{
		"presets": ["@babel/preset-env"]   // 从右向左解析
	}

	https://segmentfault.com/a/1190000016458913?utm_source=tag-newest