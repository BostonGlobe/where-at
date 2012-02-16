let $coll :=collection("/db/papereye")
let $today := current-date()
let $tokens := tokenize($today, '-')
let $year  := $tokens[1]
let $month := $tokens[2]
let $day   := $tokens[3]
let $todayString := concat($year,$month,$day)

return
<data>
{
for $articles in $coll//PrintPublicationDate[text()=$todayString]
  let $location := $articles/../../Location
  let $lat := $location/Latitude/text()
  let $lon := $location/Longitude/text()
  let $headline := $articles/../../SEOInformation/Headline/text()
  let $url := $articles/../..//CanonicalUrl[1]/text()

where normalize-space($location/Latitude) != '' and normalize-space($location/Longitude) != ''
return
  <story>
    <lat>{$lat}</lat>
    <lon>{$lon}</lon>
    <headline>{$headline}</headline>
    <url>{$url}</url>
  </story>
}
</data>
