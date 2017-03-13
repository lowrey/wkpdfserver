# wkpdfserver
-----
Creating PDFs is a deceptively simple problem.  It seems like a well defined problem.  It's a ubiquitous format and they are static. We use PDFs every day and know how they should look and behave.

When you look underneath the covers, PDF as a format is fairly complicated.  This is because of its nature as a fully featured rendering system.  If you want to make a file with self contained vector-based fonts, have multiple different page sizes, and support every image format under the sun on any platform, PDF has you covered. 

Because of the complexity of this format, you have few options when it comes to creating them progammatically. Furthermore, each one of these libraries has their own methods for implementing and describing each one of these features.

One of the most promising methods I've found is using [wkhtmltopdf](http://wkhtmltopdf.org/).  It's a static executable with webkit built-in to render HTML to create high fidelity PDFs. It saves you the hassle of having to learn a new way to describe page layout by letting you use HTML and CSS. It does all of the hard work of rendering them into this complex format.

You can use wkhtmltopdf as a command line utility but if you want to use it in an application, you need a way to call it.  I wrote a webapp that acts as an interface to wkhtmltopdf and put it up on [github](https://github.com/lowrey/wkpdfserver). You'll need the wkhtmltopdf executable on your path to use it but other than that, it is completely self contained.

![The client](http://i.imgur.com/AJ2R77u.png)

The `/pdf/create` endpoint acts as the main API for accessing the wkhtmltopdf functionality and `/client` provides the user with a simple interface to send HTML to that endpoint.  You can pass any option to it that you can use on the command line, including full HTML headers and footers and things like page size and orientation.

![Sample generated PDF](http://i.imgur.com/82ZlODx.png)
