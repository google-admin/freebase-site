var METADATA = {
  "mounts": {
    "acreassist": "//release.acreassist.dfhuynh.user.dev", 
    "lib": "//11.lib.www.branches.svn.freebase-site.googlecode.dev", 
    "mql": "//release.mql.jdouglas.user.dev", 
    "libtopic": "//release.libtopic.fbclient.user.dev", 
    "mjt": "//release.templates.jdouglas.user.dev", 
    "acredocs": "//release.acredocs.stefanomazzocchi.user.dev", 
    "datadocs": "//release.datadocs.dfhuynh.user.dev", 
    "jscheatsheet": "//release.jscheatsheet.stefanomazzocchi.user.dev"
  }, 
  "app_tag": null, 
  "app_version": 2, 
  "app_key": "devdocs", 
  "urls": {
    "client_libraries": "http://wiki.freebase.com/wiki/Libraries", 
    "acre_wiki": "http://wiki.freebase.com/wiki/Acre", 
    "data_dumps": "http://wiki.freebase.com/wiki/Data_dumps", 
    "cheatsheet": "http://download.freebase.com/MQLcheatsheet-081208.pdf", 
    "query_recipes": "http://wiki.freebase.com/wiki/MQL_Recipes", 
    "acre_recipes": "http://wiki.freebase.com/wiki/Acre_Recipes"
  }
};

acre.require(METADATA.mounts.lib + "/loader.sjs").extend_metadata(METADATA);