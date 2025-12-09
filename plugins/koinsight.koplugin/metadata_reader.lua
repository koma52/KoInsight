local logger = require("logger")
local DocSettings = require("frontend/docsettings")
local lfs = require("libs/libkoreader-lfs")

local metadata_location = DocSettings.getSidecarStorage("dir")

local KoInsightMetadataReader = {}

function KoInsightMetadataReader.bookAnnotations()
    local books = {}
    local device_id = G_reader_settings:readSetting("device_id")
    local function get_annotations(dir)
        for file in lfs.dir(dir) do
            local f = dir .. '/' .. file
            local attr = lfs.attributes(f)
            assert(type(attr) == "table")
            if attr.mode == "directory" then
                get_annotations(f)
            else
                if file:match("%.lua$") then
                    local success, metadata = pcall(dofile, f)
                    if success then
                        if metadata.partial_md5_checksum and
                            metadata.annotations and #metadata.annotations > 0 then
                            for _, annotation in ipairs(metadata.annotations) do
                                local book = {
                                    chapter = annotation.chapter,
                                    color = annotation.color,
                                    datetime = annotation.datetime,
                                    datetime_updated = annotation.datetime_updated or
                                        "",
                                    drawer = annotation.drawer,
                                    page = annotation.page,
                                    pageno = annotation.pageno,
                                    pos0 = annotation.pos0,
                                    pos1 = annotation.pos1,
                                    text = annotation.text,
                                    note = annotation.note or "",
                                    book_md5 = metadata.partial_md5_checksum,
                                    device_id = device_id
                                }
                                table.insert(books, book)
                            end
                        else
                            logger.warn(
                                "[KoInsight] No annotations or md5 found in " .. f)
                        end
                    else
                        logger.warn("[KoInsight] Failed to load metadata from " .. f)
                    end
                end
            end
        end
    end
    get_annotations(metadata_location)
    return books
end

return KoInsightMetadataReader
