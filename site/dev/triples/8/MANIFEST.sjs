var mf = JSON.parse(acre.require("CONFIG.json").body);
acre.require(mf.apps.core + "/MANIFEST").init(mf, this, {"image_base_url": "http://freebaselibs.com/static/freebase_site/triples/2e54d5b0be05d86144c5adfc0373a957", "static_base_url": "http://freebaselibs.com/static/freebase_site/triples/2e54d5b0be05d86144c5adfc0373a957"});
