const slugify = (text: string, separator?: string) => {
  text = text
    .toString()
    .toLowerCase()
    .trim();

  const sets = [
    { to: 'a', from: '[ÀÁÂÃÄÅĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' }, // note the Æ removing
    { to: 'ae', from: '[Æ]' },
    { to: 'c', from: '[ÇĆĈČ]' },
    { to: 'd', from: '[ÐĎĐÞ]' },
    { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
    { to: 'g', from: '[ĜĞĢǴ]' },
    { to: 'h', from: '[ĤḦ]' },
    { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
    { to: 'j', from: '[Ĵ]' },
    { to: 'ij', from: '[Ĳ]' },
    { to: 'k', from: '[Ķ]' },
    { to: 'l', from: '[ĹĻĽŁ]' },
    { to: 'm', from: '[Ḿ]' },
    { to: 'n', from: '[ÑŃŅŇ]' },
    { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
    { to: 'oe', from: '[Œ]' },
    { to: 'p', from: '[ṕ]' },
    { to: 'r', from: '[ŔŖŘ]' },
    { to: 's', from: '[ßŚŜŞŠ]' },
    { to: 't', from: '[ŢŤ]' },
    { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
    { to: 'w', from: '[ẂŴẀẄ]' },
    { to: 'x', from: '[ẍ]' },
    { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
    { to: 'z', from: '[ŹŻŽ]' },
    { to: '-', from: "[.·/_,:;']" }
  ];

  sets.forEach(set => {
    text = text.replace(new RegExp(set.from, 'gi'), set.to);
  });

  separator = separator ? separator.trim() : '-';

  text = text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // replace spaces with -
    .replace(/&/g, '-and-') // replace & with and
    .replace(/[^\w-]+/g, '') // remove all nono-word chars
    .replace(/--+/g, '-') // remove multiple -
    .replace(/^-+/, '') // trim - from  start of text
    .replace(/-+$/, '') // trim - from end of text
    .replace(/-/g, separator); // replace - with separator

  return text;
};

export default slugify;
