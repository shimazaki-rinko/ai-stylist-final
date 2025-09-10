var html =  '<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'+
'html>'+
'head>'+
' <meta http-equiv="Content-Type" content="text/html; charset=utf-8">'+
' <meta http-equiv="Content-Style-Type" content="text/css">'+
' <title></title>'+
' <meta name="Generator" content="Cocoa HTML Writer">'+
' <meta name="CocoaVersion" content="2487.2">'+
' <style type="text/css">'+
'   p.p1 {margin: 0.0px 0.0px 0.0px 0.0px; font: 13.0px \'Helvetica Neue\'; -webkit-text-stroke: #000000}'+
'   p.p2 {margin: 0.0px 0.0px 0.0px 0.0px; font: 13.0px \'Helvetica Neue\'; -webkit-text-stroke: #000000; min-height: 15.0px}'+
'   span.s1 {font-kerning: none}'+
' </style>'+
'/head>'+
'body>'+
'p class="p1"><span class="s1">// このファイルは、Vercelのサーバーレス関数として動作します。</span></p>'+
'p class="p1"><span class="s1">const { VertexAI } = require("@google-cloud/vertexai");</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1">export default async function handler(req, res) {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>// CORSヘッダーを設定</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>res.setHeader("Access-Control-Allow-Origin", "*");</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>res.setHeader("Access-Control-Allow-Headers", "Content-Type");</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>if (req.method === "OPTIONS") {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return res.status(204).send("");</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>if (req.method !== "POST") {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return res.status(405).json({ error: "Method Not Allowed" });</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>try {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const { feature, prompt, image, isMobile } = req.body;</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>!process.env.GCP_PROJECT_ID ||</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>!process.env.GCP_CLIENT_EMAIL ||</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>!process.env.GCP_PRIVATE_KEY</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>) {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>throw new Error("GCP認証情報が環境変数に設定されていません。");</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>const vertexAI = new VertexAI({</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>project: process.env.GCP_PROJECT_ID,</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>location: "asia-northeast1",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>credentials: {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>client_email: process.env.GCP_CLIENT_EMAIL,</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>private_key: process.env.GCP_PRIVATE_KEY.replace(/\\\\n/g, "\\n"),</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>},</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>});</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>let responsePayload;</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// --- AIスタイルアナライザー ---</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>if (feature === "analyzer" &amp;&amp; image) {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const model = "gemini-2.5-flash-preview-05-20";</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const generativeModel = vertexAI.getGenerativeModel({ model });</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const request = {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>contents: [</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>{</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>role: "user",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>parts: [</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">              </span>{</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>text: "あなたはプロのファッション評論家です。アップロードされた画像に写っている人物の服装を詳細に分析し、良い点、改善点、おすすめアイテムを提案してください。フレンドリーかつ具体的なアドバイスを日本語でお願いします。",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">              </span>},</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">              </span>{ inlineData: { mimeType: image.mimeType, data: image.data } },</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>],</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>},</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>],</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>};</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const result = await generativeModel.generateContent(request);</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>// --- 修正点: 必ず { text: ... } を返す ---</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const part = result.response.candidates[0].content.parts.find((p) =&gt; p.text);</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>responsePayload = {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>text: part ? part.text : "AIから有効な応答が得られませんでした。",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>};</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>// --- コーディネート生成 ---</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else if (feature === "generator") {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>const modelName = isMobile</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>? "gemini-2.5-flash-image-preview"</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>: "imagen-3.0-generate-002";</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>let generatedText = "AIによるコーディネート提案です。";</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>let generatedImageBase64 = null;</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>if (modelName === "imagen-3.0-generate-002") {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>let imagePrompt = prompt;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (image) {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>const textGenModel = vertexAI.getGenerativeModel({</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>model: "gemini-2.5-flash-preview-05-20",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>});</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>const textGenRequest = {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>contents: [</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">              </span>{</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>role: "user",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>parts: [</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                  </span>{</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                    </span>text: `以下の指示と画像から、服装の特徴を具体的に描写した画像生成用のプロンプトを作成してください。服装の描写のみを出力してください。\\n\\n指示: ${prompt}`,</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                  </span>},</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                  </span>{ inlineData: { mimeType: image.mimeType, data: image.data } },</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">                </span>],</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">              </span>},</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>],</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>};</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>const textResult = await textGenModel.generateContent(textGenRequest);</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>generatedText = `元の指示「${prompt}」に基づいた提案です。`;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>imagePrompt =</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">            </span>textResult.response.candidates[0].content.parts[0].text || prompt;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const imageGenModel = vertexAI.getGenerativeModel({</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>model: "imagen-3.0-generate-002",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>});</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const imageResult = await imageGenModel.generateContent(imagePrompt);</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>generatedImageBase64 = imageResult.response.candidates[0].content.parts.find(</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>(p) =&gt; p.fileData</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>)?.fileData.data;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>} else {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const generativeModel = vertexAI.getGenerativeModel({</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>model: "gemini-2.5-flash-image-preview",</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>});</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const parts = [{ text: prompt }];</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>if (image) {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>parts.push({ inlineData: { mimeType: image.mimeType, data: image.data } });</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>}</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const request = { contents: [{ role: "user", parts }] };</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const result = await generativeModel.generateContent(request);</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>const content = result.response.candidates[0].content;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>generatedText = content.parts.find((p) =&gt; p.text)?.text || generatedText;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">        </span>generatedImageBase64 = content.parts.find((p) =&gt; p.inlineData)?.inlineData</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">          </span>.data;</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>}</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>responsePayload = { text: generatedText, base64Data: generatedImageBase64 };</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>} else {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>throw new Error("無効なリクエストです。");</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>}</span></p>'+
'p class="p2"><span class="s1"></span><br></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return res.status(200).json(responsePayload);</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>} catch (error) {</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>console.error("サーバーエラー:", error);</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">    </span>return res</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>.status(500)</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">      </span>.json({ error: error.message || "サーバー内部でエラーが発生しました。" });</span></p>'+
'p class="p1"><span class="s1"><span class="Apple-converted-space">  </span>}</span></p>'+
'p class="p1"><span class="s1">}</span></p>'+
'/body>'+
'/html>';