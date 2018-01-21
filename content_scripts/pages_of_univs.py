label_dict = eval(open('imagenet1000_clsid_to_human.txt', 'r').read())

for p in range(20):
    with open('/home/aleksey/code/alekseynp.github.io/content/pages/incv3_univ_p{}.markdown'.format(p), 'w') as wf:
        wf.write('---\n')
        wf.write('title: Inception v3 Targeted Universal Attacks - Page {}\n'.format(p+1))
        wf.write('status: hidden\n')
        wf.write('---\n')

        wf.write('<center>')
        if p > 0:
            wf.write('<a href="inception-v3-targeted-universal-attacks-page-{}.html">Previous</a>'.format(p))
        wf.write(' - Page {} of 20 - '.format(p+1))
        if p < 19:
            wf.write('<a href="inception-v3-targeted-universal-attacks-page-{}.html">Next</a>'.format(p+2))
        wf.write('</center>\n')
        wf.write('<br /><br />')

        for i in range(50):
            imgidx = 50*p + i

            if i % 3 == 0:
                wf.write('<div class="row">\n')
            wf.write('<div id={} class="col-md-4"><center>\n'.format(imgidx))
            wf.write('<img src="/images/incv3_univ/{}.png" alt="{}"" /><br />\n'.format(imgidx, label_dict[imgidx]))
            wf.write('<a href="#{}">{}</a>'.format(imgidx, label_dict[imgidx]))
            wf.write('</center></div>\n')
            if i % 3 == 2 or i == 49:
                wf.write('</div><br />\n')

        wf.write('<center>')
        if p > 0:
            wf.write('<a href="inception-v3-targeted-universal-attacks-page-{}.html">Previous</a>'.format(p))
        wf.write(' - Page {} of 20 - '.format(p+1))
        if p < 19:
            wf.write('<a href="inception-v3-targeted-universal-attacks-page-{}.html">Next</a>'.format(p+2))
        wf.write('</center>\n')